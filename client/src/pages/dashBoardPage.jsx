import React from 'react'
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
              <p>20</p>
              <p>15</p>
              <p>9</p>
            </div>
            <div className='totalLeadsContainer'>
              <p className='totalLeadsValueTop'>44</p>
              <p className='totalLeadsValueBottom'>No. of total leads</p>
            </div>
          </div>
        </div>
        <div className='dataCard conversionRate'>
          <p className='cardDataHeader'>Lead Conversion Rate</p>
          <p className='conversionRateValue'>47%</p>
        </div>
      </div>
      <div className='dataCards'>
        <div className='dataCard leadQuality'>
          <Bar
            data={{
              labels: ["Good Lead", "Bad Lead"],
              datasets: [{
                label: "Enquiries",
                data: [44, 25]
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
              labels: ["Email", "Instagram", "Facebook"],
              datasets: [{
                label: "Count",
                data: [53, 30, 45],
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