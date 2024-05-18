import React from 'react'
import { LayoutDashboard, LineChart, Tags } from 'lucide-react'
import './sideMenu.css'
import { Link } from 'react-router-dom'

const SideMenu = () => {
  return (
    <nav className='side_menu'>
      <div className='container'>
        <img src='/MLogoDark.png' className='image' />
        <div>
          <ul className='menu-items'>
            <li>
              <Link to="/" className='menu-item'>
                <LayoutDashboard />
                <span className='menu-item-text'>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="market_analysis" className='menu-item'>
                <LineChart />
                <span className='menu-item-text'>Market Analytics</span>
              </Link>
            </li>
            <li>
              <Link to="enquiry_management" className='menu-item'>
                <Tags />
                <span className='menu-item-text'>Enquiry Management</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </nav>
    // <header>
    //   <nav>
    //     <NavLink to="/">dashboard</NavLink>
    //     <NavLink to="market_analysis">market</NavLink>
    //   </nav>
    // </header>
  )
}

export default SideMenu