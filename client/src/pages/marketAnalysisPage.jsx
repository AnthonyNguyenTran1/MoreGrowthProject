import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from "react-chartjs-2";

const MarketAnalysisPage = () => {

  const [jsonData, setJsonData] = useState(null);
  const [jsonDataIncomeLow, setJsonDataIncomeLow] = useState(null);
  const [jsonDataIncomeMedium, setJsonDataIncomeMedium] = useState(null);
  const [jsonDataIncomeHigh, setJsonDataIncomeHigh] = useState(null);
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

            const responseCredit = await fetch('http://localhost:8080/classify');
            const dataCredit = await responseCredit.json();

            const responseDecision = await fetch('http://localhost:8080/TimeFrame');
            const dataDecision = await responseDecision.json();
            
            setJsonData(dataAll); // Store JSON data in state
            setJsonDataIncomeLow(dataIncomeLow);
            setJsonDataIncomeMedium(dataIncomeMedium);
            setJsonDataIncomeHigh(dataIncomeHigh); 

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
    
    <div> 
        <h1>Market Analysis Page</h1>

    
      <div>

      <Doughnut
          data={{
            labels: ["Low", "Medium", "High"],
            datasets: [
              {
                label: "Leads",
                data: [jsonDataIncomeLow, jsonDataIncomeMedium, jsonDataIncomeHigh],
              }
            ],
          }}
          /> 
      
        </div>
      
      <div>
        <h2> Credit Score Chart </h2>
        <Bar
          data={{
            labels: ["Excellent", "Very Good", "Average", "Fair"],
            datasets: [
              {
                label: "Leads",
                data: jsonDataCredit,
              }
            ],
          }}
          /> 
      </div>


      <div>
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

        {jsonDataCredit ? (
            <p> {jsonDataCredit} </p> // Display JSON data
        ) : (
            <p>Loading data...</p> // Optional loading state
        )}
        {/* Add error state handling if needed */}

    </div>

  )
}

export default MarketAnalysisPage