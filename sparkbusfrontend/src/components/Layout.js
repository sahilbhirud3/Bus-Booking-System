import React from 'react'
import Footer from './footer/Footer'
import Header from './Header'
import Outlet from './Outlet'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout