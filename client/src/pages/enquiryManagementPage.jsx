import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './enquiryManagementStyling.css';

const EnquiryManagementPage = () => {
  // set components
  const [enquiries,setEnquiries] = useState([]);
  const [currentPage,setCurrentPage] = useState(0);
  const [selectedEnquiry,setSelectedEnquiry] = useState(null);
  const [searchTerm,setSearchTerm] = useState("");
  const enquiriesPerPage = 15; // 每页显示10个enquiry

  useEffect(() => {
    // fetch enquiries info from BE APIs
    fetch('http://localhost:8080/all')
      .then(response => {
        console.log('API Response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Data rece from APIs:', data);
        setEnquiries(data);
      })
      .catch(error => {
        console.error('Error log:', error);
      });
  }, []);

  // get current page enquiries
  const indexOfLastEnquiry = (currentPage + 1) * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;

  //search functions
  const filteredEnquiries = enquiries.filter(enquiry =>
    enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.transactionOutcome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentEnquiries = filteredEnquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);


  //set interaction in the table
  const handlePageClick = ({selected }) => {
    setCurrentPage(selected);
  };

  const handleEnquiryClick =(enquiry) => {
    setSelectedEnquiry(enquiry);
  };

  const handleCloseDetails = () => {
    setSelectedEnquiry(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
    // return to the firstpage for search result
  };

  return (
    <div className='enquiryManagementStyle'>
      <div className='pageHeaderStyle'>
        <h1>Enquiry Management Page</h1>
      </div>
      <div className='searchContainer'>
        <input 
          type='text' 
          placeholder='Search by name, phone, outcome or status' 
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className='content'>
        <div className='tableContainer'>
          <table className='enquiryTable'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Transaction Outcome</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentEnquiries.length > 0 ? (
                currentEnquiries.map(enquiry => (
                  <tr key={enquiry.id} onClick={() => handleEnquiryClick(enquiry)}>
                    <td>{enquiry.name}</td>
                    <td>{enquiry.phoneNumber}</td>
                    <td>{enquiry.transactionOutcome}</td>
                    <td>{enquiry.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No enquiries to display</td>
                </tr>
              )}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(filteredEnquiries.length / enquiriesPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
        {selectedEnquiry && (
          <div className='enquiryDetailsContainer'>
            <div className='enquiryDetails'>
              <h2>Enquiry Details</h2>
              
              <p><strong>Text:</strong> {selectedEnquiry.text}</p>
              <p><strong>Contact Method:</strong> {selectedEnquiry.contactMethod}</p>
              <p><strong>Customer Identity:</strong> {selectedEnquiry.customerIdentity}</p>
              <p><strong>Customer Age:</strong> {selectedEnquiry.customerAge}</p>
              <p><strong>Area of Residence:</strong> {selectedEnquiry.areaOfResidence}</p>
              <p><strong>Income Level:</strong> {selectedEnquiry.incomeLevel}</p>
              <p><strong>Expenditure Situation:</strong> {selectedEnquiry.expenditureSituation}</p>
              <p><strong>Employment Status:</strong> {selectedEnquiry.employmentStatus}</p>
              <p><strong>Property Ownership Status:</strong> {selectedEnquiry.propertyOwnershipStatus}</p>
              <p><strong>Investment Intent:</strong> {selectedEnquiry.investmentIntent}</p>
              <p><strong>Previous Transaction Experience:</strong> {selectedEnquiry.previousTransactionExperience}</p>
              <p><strong>Family Situation:</strong> {selectedEnquiry.familySituation}</p>
              <p><strong>Financial Readiness:</strong> {selectedEnquiry.financialReadiness}</p>
              <p><strong>Preferred Communication Method:</strong> {selectedEnquiry.preferredCommunicationMethod}</p>
              <p><strong>Decision Timeframe:</strong> {selectedEnquiry.decisionTimeframe}</p>
              <p><strong>Credit Score Range:</strong> {selectedEnquiry.creditScoreRange}</p>
              <p><strong>Inquiry Length:</strong> {selectedEnquiry.inquiryLength}</p>
              <p><strong>Urgency Indicator:</strong> {selectedEnquiry.urgencyIndicator}</p>
              <p><strong>Sentiment Score:</strong> {selectedEnquiry.sentimentScore}</p>
              <p><strong>Keywords Presence:</strong> {selectedEnquiry.keywordsPresence}</p>
              <p><strong>Day of the Week:</strong> {selectedEnquiry.dayOfTheWeek}</p>
              <p><strong>Time of Day:</strong> {selectedEnquiry.timeOfDay}</p>
              <p><strong>Geographical Indicator:</strong> {selectedEnquiry.geographicalIndicator}</p>
              <p><strong>Previous Interactions:</strong> {selectedEnquiry.previousInteractions}</p>
              <p><strong>Inquiry Source:</strong> {selectedEnquiry.inquirySource}</p>
              <p><strong>Property Type Interest:</strong> {selectedEnquiry.propertyTypeInterest}</p>
              <p><strong>Budget Mentioned:</strong> {selectedEnquiry.budgetMentioned}</p>
              <p><strong>Transaction Outcome:</strong> {selectedEnquiry.transactionOutcome}</p>
              <p><strong>Name:</strong> {selectedEnquiry.name}</p>
              <p><strong>Phone Number:</strong> {selectedEnquiry.phoneNumber}</p>
              <p><strong>Status:</strong> {selectedEnquiry.status}</p>
              <p><strong>Date:</strong> {selectedEnquiry.date}</p>
              <button onClick={handleCloseDetails}>Close</button>
            </div>
          </div>
        )}
      </div>
      <div className='footer'>
        <button id="cancel">Cancel</button>
        <button id="save">Save</button>
      </div>
    </div>
  );
}

export default EnquiryManagementPage;
