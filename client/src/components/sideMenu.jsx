import React, { useEffect, useState } from 'react'
import { LayoutDashboard, LineChart, Tags, ChevronFirst, ChevronLast } from 'lucide-react'
import './sideMenu.css'
import { Link, useLocation } from 'react-router-dom'


const SideMenu = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // }

  return (
    <nav className={`side_menu ${isOpen ? 'open' : 'closed'}`}>
      <div className='container'>
        <div className='sideMenuHeader'>
          <img src='/MLogoDark.png' className='image' />
          {/* <button onClick={toggleMenu} className='toggle-button'>
            {isOpen ? <ChevronFirst size={30}/> : <ChevronLast size={30}/>}
          </button> */}
        </div>
        <div>
          <ul className='menu-items'>
            <li className='item' id={location.pathname == "/" ? "active" : ""}>
              <Link to="/" className='menu-item'>
                <LayoutDashboard />
                <span className='menu-item-text'>Dashboard</span>
              </Link>
            </li>
            <li className='item' id={location.pathname == "/market_analysis" ? "active" : ""}>
              <Link to="market_analysis" className='menu-item'>
                <LineChart />
                <span className='menu-item-text'>Market Analytics</span>
              </Link>
            </li>
            <li className='item' id={location.pathname == "/enquiry_management" ? "active" : ""}>
              <Link to="enquiry_management" className='menu-item'>
                <Tags />
                <span className='menu-item-text'>Enquiry Management</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default SideMenu