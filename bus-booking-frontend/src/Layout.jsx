
import Footer from './components/footer/Footer'
 import Header from "./components/header/Header"
import { Outlet } from 'react-router-dom'
// import Navbar from './components/header/Navbar'

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