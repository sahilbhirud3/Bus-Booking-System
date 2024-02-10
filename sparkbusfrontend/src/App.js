// import logo from './logo.svg';
import './App.css';
import { Routes,Route, BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AboutUs from './components/aboutus/AboutUs';


function App() {
  return (
    <div className="App">
      {/* <Router> */}

   <Router>

      <Routes>
        <Route path='/' element={<Layout/>}/> 
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>


      </Routes>
   </Router>
      {/* </Router> */}
     

    </div>
  );
}

export default App;
//{/* <Route path='/admin' element={<About/>}></Route> */}
// {/* 
//         <Route index element={<Home/>}></Route>
//         <Route path='/video' element={<Video/>}> </Route>
//         <Route path='/bikes' element={<Bikes/>}>  </Route>
//         <Route path='/contact' element={<Contact/>}>  </Route>
//         <Route path='/about' element={<About/>}>  </Route>
//         <Route path='/bikedetail' element={<BikeDetail/>}> </Route>
//         <Route path='/login' element={<Login/>}> </Route>
//         <Route path='/wishlist' element={<WishList/>}> </Route>
//         <Route path='/mybikes' element={<MyBikes/>}> </Route>
//         <Route path='/bikedetails/:id' element={<BikeDetail/>}></Route> */}
