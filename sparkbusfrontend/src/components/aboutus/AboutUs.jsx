import React from 'react';
import './AboutUs.css'; // Import your CSS file
import Header from "../Header";
import Footer from "../Footer";
import sahil from "../images/sahil.jpg"

function AboutUs() {
  return (
    <>
    <Header/>
    <div className="about_us_container">
      <h1>About Us</h1>
      <div className="card_container">
        <div className="card">
          <img src={sahil} alt="Person 1" />
          <h2>Sahil Bhirud</h2>
          <p>Software Engineer</p>
          <p>Linkedin link Instagram link</p>
        </div>
        <div className="card">
          <img src={sahil} alt="Person 2" />
          <h2>Pranav Chaudhari</h2>
          <p>Software Engineer</p>
          <p>Linkedin link Instagram link</p>
        </div>
        <div className="card">
          <img src={sahil} alt="Person 3" />
          <h2>Arjun(Nikhilesh) Sharma</h2>
          <p>Software Engineer</p>
          <p>Linkedin link Instagram link</p>
        </div>
        <div className="card">
          <img src={sahil} alt="Person 4" />
          <h2>Raaj Chimulkar</h2>
          <p>Software Engineer</p>
          <p>Linkedin link Instagram link</p>
        </div>
        <div className="card">
          <img src={sahil} alt="Person 5" />
          <h2>Krishna Gite</h2>
          <p>Software Engineer</p>
          <p>Linkedin link Instagram link</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default AboutUs;