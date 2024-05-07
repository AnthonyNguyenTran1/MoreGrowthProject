import React from 'react'
import SideMenu from '../src/components/sideMenu'
import './baseLayout.css'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  return (
    <main className='layout'>
      <div>
        <SideMenu />
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  )
}

export default BaseLayout