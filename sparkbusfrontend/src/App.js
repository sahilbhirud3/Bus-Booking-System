// import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Layout/>}> 
{/* 
        <Route index element={<Home/>}></Route>
        <Route path='/video' element={<Video/>}> </Route>
        <Route path='/bikes' element={<Bikes/>}>  </Route>
        <Route path='/contact' element={<Contact/>}>  </Route>
        <Route path='/about' element={<About/>}>  </Route>
        <Route path='/bikedetail' element={<BikeDetail/>}> </Route>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/wishlist' element={<WishList/>}> </Route>
        <Route path='/mybikes' element={<MyBikes/>}> </Route>
        <Route path='/bikedetails/:id' element={<BikeDetail/>}></Route> */}

        </Route>

        {/* <Route path='/admin' element={<About/>}></Route> */}
      </Routes>

    </div>
  );
}

export default App;
