import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import './dashBoardStyling.css'

defaults.maintainAspectRatio = false;
defaults.responsive = true

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";
defaults.plugins.title.font.size = 20;

const DashBoardPage = () => {
  const [totalGoodLeads, setTotalGoodLeads] = useState(null);
  const [totalBadLeads, setTotalBadLeads] = useState(null);
  const [openLeads, setOpenLeads] = useState(null);
  const [closedLeads, setClosedLeads] = useState(null);
  const [lostLeads, setLostLeads] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);
  const [phoneCallMethod, setPhoneCallMethod] = useState(null);
  const [emailMethod, setEmailMethod] = useState(null);
  const [socialMediaMethod, setSocialMediaMethod] = useState(null);
  const [dailyEnquiries, setDailyEnquiries] = useState([]);

  useEffect(() => {
    // Asynchronous function to fetch data
    const fetchData = async () => {
      // Fetching data from API, parsing the response JSON data, and updating state variable 
      try {
        // TotalGoodLeads API
        const responseTotalGoodLeads = await fetch("http://localhost:8080/totalgoodleads/Good");
        const dataTotalGoodLeads = await responseTotalGoodLeads.json();
        setTotalGoodLeads(dataTotalGoodLeads);

        //TotalBadLeads API
        const responseTotalBadLeads = await fetch("http://localhost:8080/totalgoodleads/Bad");
        const dataTotalBadLeads = await responseTotalBadLeads.json();
        setTotalBadLeads(dataTotalBadLeads);

        // OpenLeads API 
        const responseOpenLeads = await fetch("http://localhost:8080/Openleads");
        const dataOpenLeads = await responseOpenLeads.json();
        setOpenLeads(dataOpenLeads);

        // ClosedLeads API
        const responseClosedLeads = await fetch("http://localhost:8080/Closedleads");
        const dataClosedLeads = await responseClosedLeads.json();
        setClosedLeads(dataClosedLeads);

        // LostLeads API
        const responseLostLeads = await fetch("http://localhost:8080/Lostleads");
        const dataLostLeads = await responseLostLeads.json();
        setLostLeads(dataLostLeads)

        // LeadConversion API
        const responseConversionRate = await fetch("http://localhost:8080/ConversionRate");
        const dataConversionRate = await responseConversionRate.text();
        setConversionRate(dataConversionRate);

        // MethodOfEnquiry API
        const responseSocialMediaMethod = await fetch("http://localhost:8080/contactMethod/Social%20Media");
        const dataSocialMediaMethod = await responseSocialMediaMethod.json();
        setSocialMediaMethod(dataSocialMediaMethod);

        const responseEmailMethod = await fetch("http://localhost:8080/contactMethod/Email");
        const dataEmailMethod = await responseEmailMethod.json();
        setEmailMethod(dataEmailMethod);

        const responsePhoneCallMethod = await fetch("http://localhost:8080/contactMethod/Phone%20Call")
        const dataPhoneCallMethod = await responsePhoneCallMethod.json();
        setPhoneCallMethod(dataPhoneCallMethod);

        // DailyEnquiries API
        const responseDailyEnquiries = await fetch("http://localhost:8080/past7enquiry");
        const dataDailyEnquiries = await responseDailyEnquiries.json();
        setDailyEnquiries(dataDailyEnquiries)
        console.log(dailyEnquiries)

      } catch (err) {
        // Log any errors that occur during the fetch process
        console.log(err)
      };
    }
    fetchData();
  }, [])

  return (
    <div className='dashBoardStyle'>
      <div className='pageHeaderStyle'>
        <h1>Welcome, Vito</h1>

      </div>
      <div className='dataCards'>
        <div className="dataCard totalLeads">
          <p className='cardDataHeader'>Total Leads</p>
          <div className="status">
            <div className='statusValue'>
              <p>Open</p>
              <p>Closed</p>
              <p>Lost</p>
            </div>
            <div className='statusValue'>
              <p>{openLeads}</p>
              <p>{closedLeads}</p>
              <p>{lostLeads}</p>
            </div>
            <div className='totalLeadsContainer'>
              <p className='totalLeadsValueTop'>{totalGoodLeads}</p>
              <p className='totalLeadsValueBottom'>No. of total leads</p>
            </div>
          </div>
        </div>
        <div className='dataCard conversionRate'>
          <p className='cardDataHeader'>Lead Conversion Rate</p>
          <p className='conversionRateValue'>{conversionRate}</p>
        </div>
      </div>
      <div className='dataCards'>
        <div className='dataCard leadQuality'>
          <Bar
            data={{
              labels: ["Good Lead", "Bad Lead"],
              datasets: [{
                label: "Enquiries",
                data: [totalGoodLeads, totalBadLeads]
              }]
            }}
            options={{
              plugins: {
                title: {
                  text: "Lead Quality"
                }
              }
            }}
          />
        </div>
        <div className='dataCard methOfEnq'>
          <Doughnut
            data={{
              labels: ["Email", "Social Media", "Phone Call"],
              datasets: [{
                label: "Count",
                data: [emailMethod, socialMediaMethod, phoneCallMethod],
                borderRadius: 5
              }]
            }}
            options={{
              plugins: {
                title: {
                  text: "Method of Enquiries"
                }
              }
            }}
          />
        </div>
        <div className='dataCard'>
          <Line
            data={{
              labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  label: "Enquiries",
                  data: [23, 32, 12, 34, 45, 56, 32]
                }
              ]
            }}
            options={{
              plugins: {
                title: {
                  text: "Daily Enquiries"
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default DashBoardPage