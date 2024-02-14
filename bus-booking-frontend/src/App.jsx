
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Login from "./pages/login/Login";
import Signup from './pages/signup/Signup';
import AboutUs from './pages/aboutus/AboutUs';
import BusLayout from './components/buslayout/BusLayout';
import Home from './pages/home/Home';
import ForgotPassword from './pages/forgotpass/ForgotPassword';
import ChangePassword from './pages/changepass/ChangePassword';
import ResetPassword from './pages/resetpass/ResetPassword';
function App() {
  
  return (
    
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Layout/>}> 
        <Route index element={<Home/>}></Route>
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/buslayout' element={<BusLayout />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/change-password' element={<ChangePassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        </Route>
        {/* <Route path='/seatselection' element={<BusSeats />} /> */}
        {/* Add more routes here */}
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  
  );
}

function NoMatch() {
  return <h1>404 - Not Found</h1>;
}

export default App;
