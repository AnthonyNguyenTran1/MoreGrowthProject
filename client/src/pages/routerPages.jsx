import { Route, Routes } from 'react-router-dom'
import DashBoardPage from './dashBoardPage'
import EnquiryManagementPage from './enquiryManagementPage'
import MarketAnalysisPage from './marketAnalysisPage'

const RouterPages = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoardPage />} />
      <Route path="/Enquiry_Management" element={<EnquiryManagementPage />}/>
      <Route path="/Market_Analysis" element={<MarketAnalysisPage />}/>
    </Routes>
  )
}

export default RouterPages

