import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from "react-chartjs-2";
import './marketAnalysisStyling.css';



const MarketAnalysisPage = () => {

  const [jsonData, setJsonData] = useState(null);
  const [jsonDataIncomeLow, setJsonDataIncomeLow] = useState(null);
  const [jsonDataIncomeMedium, setJsonDataIncomeMedium] = useState(null);
  const [jsonDataIncomeHigh, setJsonDataIncomeHigh] = useState(null);
  const [jsonDataIncomeVeryHigh, setJsonDataIncomeVeryHigh] = useState(null);
  const [jsonDataCredit, setJsonDataCredit] = useState([]);
  const [jsonDataTimeframes, setJsonDataTimeframes] = useState(null);

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
        <div className='creditRange methOfCredit barFormatted'>
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
        
        </div>

        <div className='dataCards creditRange methOfCredit barFormatted'>
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
        </div>
      
        <div className='methOfCredit creditRange barFormatted'>
          <h2> Decision TimeFrame Chart </h2>
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
        </div>
        
      </div>
    </div>

  )
}

export default MarketAnalysisPage