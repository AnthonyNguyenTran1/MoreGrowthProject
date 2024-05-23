import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { CircleHelp } from 'lucide-react'
// test test
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import './marketAnalysisStyling.css';
import './pageComponentStyling.css'

defaults.maintainAspectRatio = false;
defaults.responsive = true

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";
defaults.plugins.title.font.size = 20;

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'black',
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
  },
}));

const MarketAnalysisPage = () => {

  const [jsonData, setJsonData] = useState(null);
  const [jsonDataIncomeLow, setJsonDataIncomeLow] = useState(null);
  const [jsonDataIncomeMedium, setJsonDataIncomeMedium] = useState(null);
  const [jsonDataIncomeHigh, setJsonDataIncomeHigh] = useState(null);
  const [jsonDataIncomeVeryHigh, setJsonDataIncomeVeryHigh] = useState(null);
  const [jsonDataCredit, setJsonDataCredit] = useState([]);
  const [jsonDataTimeframes, setJsonDataTimeframes] = useState(null);

  const [phoneCallSourceEnquiry, setPhoneCallSourceEnquiry] = useState(null);
  const [emailSourceEnquiry, setEmailSourceEnquiry] = useState(null);
  const [instagramSourceEnquiry, setInstragramSourceEnquiry] = useState(null);
  const [facebookSourceEnquiry, setFacebookSourceEnquiry] = useState(null);

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

        // SourceOfEnquiry API
        const responsePhoneCallSourceEnquiry = await fetch("http://localhost:8080/inquirySource/Direct%20Call")
        const dataPhoneCallSourceEnquiry = await responsePhoneCallSourceEnquiry.json();
        setPhoneCallSourceEnquiry(dataPhoneCallSourceEnquiry);

        const responseEmailSourceEnquiry = await fetch("http://localhost:8080/inquirySource/Property%20Portal")
        const dataEmailSourceEnquiry = await responseEmailSourceEnquiry.json();
        setEmailSourceEnquiry(dataEmailSourceEnquiry);

        const responseFacebookSourceEnquiry = await fetch("http://localhost:8080/inquirySource/Facebook")
        const dataFacebookSourceEnquiry = await responseFacebookSourceEnquiry.json();
        setFacebookSourceEnquiry(dataFacebookSourceEnquiry);

        const responseInstagramSourceEnquiry = await fetch("http://localhost:8080/inquirySource/Instagram%20Ad")
        const dataInstragramSourceEnquiry = await responseInstagramSourceEnquiry.json();
        setInstragramSourceEnquiry(dataInstragramSourceEnquiry);

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

  return (
    <div className='pageStyling'>
      <div className='pageHeaderStyling'>
        <h1>Market Analysis Page</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className='dataCard creditScoreRange'>
            <div className='helpStyle'>
              <h3>Credit Score Range</h3>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <span>A range of credit score from good quality leads.</span>
                  </React.Fragment>
                }
              >
                <div className='helpStyle'>
                  <CircleHelp size={16} />
                </div>
              </HtmlTooltip>
            </div>
            <Bar
              style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}
              data={{
                labels: ["Excellent", "Very Good", "Average", "Fair", "Low"],
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
                    display: false
                  }
                }
              }}
            />
          </div>
          <div className='dataCard decisionTimeFrame'>
            <div className='helpStyle'>
              <h3>Decision TimeFrame Chart</h3>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <span>A graph that shows how long a potential lead/client (AKA 'Good' quality lead) takes to make a decision on a property.</span>
                  </React.Fragment>
                }
              >
                <div className='helpStyle'>
                  <CircleHelp size={16} />
                </div>
              </HtmlTooltip>
            </div>
            <Bar
              style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}
              data={{
                labels: ["Immediate", "1 month", "<3 months", "<6 months", "6 months", "6+ months", "12+ months"],
                datasets: [
                  {
                    label: "Leads",
                    data: jsonDataTimeframes,
                  }
                ],
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
        </div>
        <div style={{ display: 'flex' }}>
          <div className='dataCard incomeLvl'>
            <div className='helpStyle'>
              <h3>Income Level</h3>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <span>Level of income from a pool of potential clients/leads.</span>
                  </React.Fragment>
                }
              >
                <div className='helpStyle'>
                  <CircleHelp size={16} />
                </div>
              </HtmlTooltip>
            </div>
            <Doughnut
              style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}
              data={{
                labels: ["Low", "Medium", "High", "Very High"],
                datasets: [
                  {
                    label: "Leads",
                    data: [jsonDataIncomeLow, jsonDataIncomeMedium, jsonDataIncomeHigh, jsonDataIncomeVeryHigh]
                  }
                ],
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
          <div className='dataCard sourceOfEnq'>
            <div className='helpStyle'>
              <h3>Source of Enquiries</h3>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <span>Where each potential client's/lead's source on property enquiries came from.</span>
                  </React.Fragment>
                }
              >
                <div className='helpStyle'>
                  <CircleHelp size={16} />
                </div>
              </HtmlTooltip>
            </div>
            <Pie
              style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}
              data={{
                labels: ["Instagram Ads", "Facebook Ads", "Property Portal", "Direct Calls"],
                datasets: [{
                  label: "Count",
                  data: [instagramSourceEnquiry, facebookSourceEnquiry, emailSourceEnquiry, phoneCallSourceEnquiry],
                  borderRadius: 2
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketAnalysisPage