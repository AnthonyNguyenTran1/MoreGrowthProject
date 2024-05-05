import { Route, Routes } from 'react-router-dom'
import './App.css'

// Layout
import BaseLayout from '../layouts/baseLayout'

// Pages
import DashBoardPage from './pages/dashBoardPage'
import EnquiryManagementPage from './pages/enquiryManagementPage'
import MarketAnalysisPage from './pages/marketAnalysisPage'

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<DashBoardPage />} />
        <Route path="enquiry_management" element={<EnquiryManagementPage />} />
        <Route path="market_analysis" element={<MarketAnalysisPage />} />
      </Route>
    </Routes>
  )
}

export default App
