import React from 'react';
import './AboutUs.css'; // Import your CSS file
import Header from "../Header";
import Footer from "../Footer";

function AboutUs() {
  return (
    <>
    <Header/>
    <div className="about_us_container">
      <h1>About Us</h1>
      <div className="card_container">
        <div className="card">
          <img src="person1.jpg" alt="Person 1" />
          <h2>John Doe</h2>
          <p>Software Engineer</p>
          <p>John is a skilled software engineer with expertise in various programming languages.</p>
        </div>
        <div className="card">
          <img src="person2.jpg" alt="Person 2" />
          <h2>Jane Smith</h2>
          <p>Product Manager</p>
          <p>Jane excels in product management and has successfully led multiple projects to success.</p>
        </div>
        <div className="card">
          <img src="person3.jpg" alt="Person 3" />
          <h2>Michael Johnson</h2>
          <p>UX/UI Designer</p>
          <p>Michael is a creative UX/UI designer who crafts user-friendly interfaces.</p>
        </div>
        <div className="card">
          <img src="person4.jpg" alt="Person 4" />
          <h2>Sarah Williams</h2>
          <p>Marketing Specialist</p>
          <p>Sarah has a knack for marketing strategies and has driven impressive growth for our brand.</p>
        </div>
        <div className="card">
          <img src="person5.jpg" alt="Person 5" />
          <h2>David Brown</h2>
          <p>Data Analyst</p>
          <p>David analyzes data effectively to provide valuable insights for business decisions.</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default AboutUs;