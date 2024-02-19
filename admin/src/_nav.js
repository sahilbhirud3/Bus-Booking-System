import React from 'react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import {

  cilPencil,

  cilSpeedometer,
  cilBank,

} from '@coreui/icons'
import {  CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Station ',
  },
  {
    component: CNavItem,
    name: 'Add Station',
    to: '/pages/station',
    icon: <FontAwesomeIcon icon={faCity}  className="nav-icon"/>
    ,
  },
  { 
    component: CNavItem,
    name: 'All Stations',
    to: '/pages/stations',
    icon: <FontAwesomeIcon icon={faCity}  className="nav-icon"/>,
  },


  {
    component: CNavTitle,
    name: 'Routes ',
  },
  {
    component: CNavItem,
    name: 'Add Route  ',
    to: '/pages/addRoute',
    icon: <FontAwesomeIcon icon={faRoute}  className="nav-icon"/>
    ,
  },
  { 
    component: CNavItem,
    name: 'All Routes',
    to: '/pages/routes',
    icon: <FontAwesomeIcon icon={faRoute}  className="nav-icon"/>,
  },


  {
    component: CNavTitle,
    name: 'Bus ',
  },
  {
    component: CNavItem,
    name: 'Add Bus',
    to: '/pages/addBus',
    icon: <FontAwesomeIcon icon={faBus}  className="nav-icon"/>,
  },

  
  {
    component: CNavItem,
    name: 'All/Delete Buses',
    to: '/pages/allBuses',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Payment ',
  },
  
  
  {
    component: CNavItem,
    name: 'Payments',
    to: '/pages/payments',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  }
  
]

export default _nav
