import React, { useEffect, useState } from 'react';

const MarketAnalysisPage = () => {

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/all');
            const data = await response.json();
            setJsonData(data); // Store JSON data in state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();

  }, []);


  return (
    
    <div> 
        <h1>Market Analysis Page</h1>
        {jsonData ? (
            <p> {jsonData[0].text} </p> // Display JSON data
        ) : (
            <p>Loading data...</p> // Optional loading state
        )}
        {/* Add error state handling if needed */}

    </div>

  )
}

export default MarketAnalysisPage