import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from "react-chartjs-2";
import './marketAnalysisStyling.css';
import GridLayout from 'react-grid-layout';



const MarketAnalysisPage = () => {

  const [jsonData, setJsonData] = useState(null);
  const [jsonDataIncomeLow, setJsonDataIncomeLow] = useState(null);
  const [jsonDataIncomeMedium, setJsonDataIncomeMedium] = useState(null);
  const [jsonDataIncomeHigh, setJsonDataIncomeHigh] = useState(null);
  const [jsonDataIncomeVeryHigh, setJsonDataIncomeVeryHigh] = useState(null);
  const [jsonDataCredit, setJsonDataCredit] = useState([]);
  const [jsonDataTimeframes, setJsonDataTimeframes] = useState(null);

  const initialLayout = [
    { i: 'IncomeChart', x: 0, y: 0, w: 4, h: 6 },
    { i: 'CreditChart', x: 4, y: 0, w: 4, h: 6 },
    { i: 'DecisionChart', x: 8, y: 0, w: 4, h: 6 }
  ];

  const [layout, setLayout] = useState(() => {
    const savedLayout = localStorage.getItem('dashboardLayout');
    return savedLayout ? JSON.parse(savedLayout) : initialLayout;
  });

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
  };

  const handleDragStop = (layout, oldItem, newItem) => {
    const newLayout = [...layout];
    const oldItemIndex = newLayout.findIndex(item => item.i === oldItem.i);
    const newItemIndex = newLayout.findIndex(item => item.i === newItem.i);

    if (oldItemIndex !== -1 && newItemIndex !== -1) {
      // Swap positions of the items
      const temp = newLayout[oldItemIndex];
      newLayout[oldItemIndex] = newLayout[newItemIndex];
      newLayout[newItemIndex] = temp;

      setLayout(newLayout);
      localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/all');
            const dataAll = await response.json();

            const responseIncomeLow = await fetch('http://localhost:8080/incomelevel/Low');
            const dataIncomeLow = await responseIncomeLow.json();

            const responseIncomeMedium = await fetch('http://localhost:8080/incomelevel/Medium');
            const dataIncomeMedium = await responseIncomeMedium.json();

            const responseIncomeHigh = await fetch('http://localhost:8080/incomelevel/High');
            const dataIncomeHigh = await responseIncomeHigh.json();

            const responseIncomeVeryHigh = await fetch('http://localhost:8080/incomelevel/Very High');
            const dataIncomeVeryHigh = await responseIncomeVeryHigh.json();

            const responseCredit = await fetch('http://localhost:8080/classify');
            const dataCredit = await responseCredit.json();

            const responseDecision = await fetch('http://localhost:8080/TimeFrame');
            const dataDecision = await responseDecision.json();
            
            setJsonData(dataAll); // Store JSON data in state
            setJsonDataIncomeLow(dataIncomeLow);
            setJsonDataIncomeMedium(dataIncomeMedium);
            setJsonDataIncomeHigh(dataIncomeHigh);
            setJsonDataIncomeVeryHigh(dataIncomeVeryHigh);

            setJsonDataCredit(dataCredit);
            setJsonDataTimeframes(dataDecision);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();

  }, []);

  // Accessing the first element of the dataArray
  /*const firstElement = jsonDataCredit[0] || null;
  const secondElement = jsonDataCredit[1] || null;
  const thirdElement = jsonDataCredit[2] || null;
  const fourthElement = jsonDataCredit[3] || null; */


  return (
    
    <div className='dashBoardStyle charts-container'>
      <div className='pageHeaderStyle'>
        <h1>Market Analysis Page</h1>
      </div>
      
      <div className='dataCards'>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onDragStop={handleDragStop}
        onLayoutChange={onLayoutChange}>
        <div key="IncomeChart" className='creditRange methOfCredit barFormatted'>
        {jsonDataIncomeLow !== null && jsonDataIncomeMedium !== null && jsonDataIncomeHigh !== null && jsonDataIncomeVeryHigh !== null ? (
            <Doughnut
                data={{
                  labels: ["Low", "Medium", "High","Very High"],
                  datasets: [
                    {
                      label: "Leads",
                      data: [jsonDataIncomeLow, jsonDataIncomeMedium, jsonDataIncomeHigh,jsonDataIncomeVeryHigh]
                    }
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "Credit Score Classify"
                    }
                  }
                }}
                />
              ) : (
                <p>Loading Income Chart...</p>
              )} 
        
        </div>

        <div key="CreditChart" className='dataCards creditRange methOfCredit barFormatted'>
        {jsonDataCredit.length > 0 ? (
          <Bar
            data={{
              labels: ["Excellent", "Very Good", "Average", "Fair","Low"],
              datasets: [
                {
                  label: "Leads",
                  data: jsonDataCredit,
                }
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Credit Range"
                }
              }
            }}
            /> 
          ) : (
            <p>Loading Credit Chart...</p>
          )}
        </div>
      
        <div key="DecisionChart" className='methOfCredit creditRange barFormatted'>
          <h2> Decision TimeFrame Chart </h2>
          {jsonDataTimeframes !== null ? (
          <Bar
            data={{
              labels: ["Immediate", "1 month", "<3 months", "<6 months", "6 months", "6+ months", "12+ months"],
              datasets: [
                {
                  label: "Leads",
                  data: jsonDataTimeframes,
                }
              ],
            }}
            />
          ) : (
            <p>Loading Decision TimeFrame Chart...</p>
          )}
        </div>
        </GridLayout>
      </div>
      
    </div>

  )
}

export default MarketAnalysisPage