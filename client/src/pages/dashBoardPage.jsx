import { defaults } from 'chart.js/auto';
import { CircleHelp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { ClipLoader } from 'react-spinners';
import './dashBoardStyling.css';
import './pageComponentStyling.css';

defaults.maintainAspectRatio = false;
defaults.responsive = true

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";
defaults.plugins.title.font.size = 18.72;

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'black',
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
  },
}));

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
        // TotalGoodLeads API =====
        const responseTotalGoodLeads = await fetch("http://mgcrm.ap-southeast-2.elasticbeanstalk.com/totalgoodleads/Good");
        const dataTotalGoodLeads = await responseTotalGoodLeads.json();
        setTotalGoodLeads(dataTotalGoodLeads);

        //TotalBadLeads API =====
        const responseTotalBadLeads = await fetch("http://mgcrm.ap-southeast-2.elasticbeanstalk.com/totalgoodleads/Bad");
        const dataTotalBadLeads = await responseTotalBadLeads.json();
        setTotalBadLeads(dataTotalBadLeads);

        // OpenLeads API =====
        const responseOpenLeads = await fetch("http://mgcrm.ap-southeast-2.elasticbeanstalk.com/Openleads");
        const dataOpenLeads = await responseOpenLeads.json();
        setOpenLeads(dataOpenLeads);

        // ClosedLeads API =====
        const responseClosedLeads = await fetch("http://mgcrm.ap-southeast-2.elasticbeanstalk.com/Closedleads");
        const dataClosedLeads = await responseClosedLeads.json();
        setClosedLeads(dataClosedLeads);

        // LostLeads API =====
        const responseLostLeads = await fetch("http://mgcrm.ap-southeast-2.elasticbeanstalk.com/Lostleads");
        const dataLostLeads = await responseLostLeads.json();
        setLostLeads(dataLostLeads)

        // LeadConversion API =====
        const responseConversionRate = await fetch("http://mgcrm.ap-southeast-2.elasticbeanstalk.com/ConversionRate");
        const dataConversionRate = await responseConversionRate.text();
        setConversionRate(dataConversionRate);

        // MethodOfEnquiry API ======
        const responseSocialMediaMethod = await fetch("http://mgcrm.ap-southeast-2.elasticbeanstalk.com/contactMethod/Social%20Media");
        const dataSocialMediaMethod = await responseSocialMediaMethod.json();
        setSocialMediaMethod(dataSocialMediaMethod);

        const responseEmailMethod = await fetch("http://mgcrm.ap-southeast-2.elasticbeanstalk.com/contactMethod/Email");
        const dataEmailMethod = await responseEmailMethod.json();
        setEmailMethod(dataEmailMethod);

        const responsePhoneCallMethod = await fetch("http://mgcrm.ap-southeast-2.elasticbeanstalk.com/contactMethod/Phone%20Call")
        const dataPhoneCallMethod = await responsePhoneCallMethod.json();
        setPhoneCallMethod(dataPhoneCallMethod);

        // DailyEnquiries API =====
        const responseDailyEnquiries = await fetch("http://mgcrm.ap-southeast-2.elasticbeanstalk.com/past7enquiry");
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
    <div className='pageStyling'>
      <div className='pageHeaderStyling'>
        <h1>Welcome, MoreGrowthPro</h1>
      </div>
      <div className=''>
        <div style={{ display: 'flex' }}>
          <div className='dataCard dailyEnq'>
            <div className='helpStyle'>
              <h3>Daily-Week Enquiries</h3>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <span>Reveals the number of enquiries received from each day of the week.</span>
                  </React.Fragment>
                }
              >
                <div className='helpStyle'>
                  <CircleHelp size={16} />
                </div>
              </HtmlTooltip>
            </div>
            <Line
              style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}
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
                    display: false
                  }
                }
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className='dataCard leadConversionRate'>
              <div className='helpStyle'>
                <h3>Lead Conversion Rate</h3>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <span>The success rate of all potential leads (good quality leads).</span>
                    </React.Fragment>
                  }
                >
                  <div className='helpStyle'>
                    <CircleHelp size={16} />
                  </div>
                </HtmlTooltip>
              </div>
              {conversionRate !== null ? (
              <p className='conversionRateValue'>{conversionRate}</p>
            ) : (
              <div className='loader'>
                <ClipLoader color={"#123abc"} loading={true} size={100} />
              </div>
            )}
            </div>
            <div className='dataCard totalLeads'>
              <div className='helpStyle'>
                <h3>Total Leads</h3>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <span>Current statistics on potential clients that have purchased, declined, or is still under negotiation</span>
                    </React.Fragment>
                  }
                >
                  <div className='helpStyle'>
                    <CircleHelp size={16} />
                  </div>
                </HtmlTooltip>
              </div>
              <div className='totalLeadsSection'>
              {openLeads !== null && closedLeads !== null && lostLeads !== null && totalGoodLeads ? (
                <>
                <div className='leadsData'>
                  <div className='dataSection'>
                    <p>Open</p>
                    <p>Closed</p>
                    <p>Lost</p>
                  </div>
                  
                  <div className='dataSection'>
                    <p>{openLeads}</p>
                    <p>{closedLeads}</p>
                    <p>{lostLeads}</p>
                  </div>
                </div>
                <div className='totalData'>
                  <h4>{totalGoodLeads}</h4>
                  <p className='glText'>No. of total leads</p>
                </div>
                </>
                ) : (
                  <div className='loader totalLeads'>
                    <ClipLoader color={"#123abc"} loading={true} size={100} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className='dataCard leadQuality'>
            <div className='helpStyle'>
              <h3>Lead Quality</h3>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <span>Shows the number of 'Good' and 'Bad' quality leads.</span>
                  </React.Fragment>
                }
              >
                <div className='helpStyle'>
                  <CircleHelp size={16} />
                </div>
              </HtmlTooltip>
            </div>
            {totalGoodLeads !== null && totalBadLeads !== null ? (
            <Bar
              style={{ marginBottom: '1.5rem' }}
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
                    displa: false
                  }
                }
              }}
            />
          ) : (
            <div className='loader'>
              <ClipLoader color={"#123abc"} loading={true} size={100} />
            </div>
          )}
          </div>
          <div className='dataCard methodOfEnq'>
            <div className='helpStyle'>
              <h3>Method of Enquiries</h3>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <span>Shows different method of enquiries sent to you and its total count from the current exisiting enquiries.</span>
                  </React.Fragment>
                }
              >
                <div className='helpStyle'>
                  <CircleHelp size={16} />
                </div>
              </HtmlTooltip>
            </div>
            {emailMethod !== null && socialMediaMethod !== null && phoneCallMethod !== null ? (
            <Doughnut
              style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}
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
                    display: false
                  }
                }
              }}
            />
          ) : (
            <div className='loader'>
              <ClipLoader color={"#123abc"} loading={true} size={100} />
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoardPage