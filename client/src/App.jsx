import { Route, Routes } from 'react-router-dom'
import './App.css'

// Pages
import DashBoardPage from './pages/dashBoardPage'
import EnquiryManagementPage from './pages/enquiryManagementPage'
import MarketAnalysisPage from './pages/marketAnalysisPage'
import SideMenu from './components/sideMenu'

function App() {
  return (
    <div className='website'>
      <SideMenu />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="enquiry_management" element={<EnquiryManagementPage />} />
          <Route path="market_analysis" element={<MarketAnalysisPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
