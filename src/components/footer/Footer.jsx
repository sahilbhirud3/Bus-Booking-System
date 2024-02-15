// React Component

import {  SiInstagram, SiFacebook, SiGithub, SiLinkedin, SiTwitter, SiGoogle } from "react-icons/si";
import { FaBus } from "react-icons/fa";
import './Footer.css';

export default function App() {
  return (
    <footer className="footer">
      <section className="footer_section footer_section-social">
        <div className="footer_social">
          <span>Get connected with us on social networks:</span>
          <a href="/" className="footer_social-link">
          <SiFacebook />
          </a>
          <a href="/" className="footer_social-link">
          <SiTwitter />
          </a>
          <a href="/" className="footer_social-link">
          <SiGoogle />
          </a>
          <a href="/" className="footer_social-link">
          <SiInstagram />
          </a>
          <a href="/" className="footer_social-link">
          <SiLinkedin />
          </a>
          <a href="/" className="footer_social-link">
          <SiGithub />
          </a>
        </div>
      </section>

      <section className="footer_section footer_content">
        <div className="footer_content-container">
          <h6 className="footer_content-heading">
            <FaBus/>&nbsp;
            SPARK Bus
          </h6>
          <p className="footer_content-paragraph">
            We are a Bus Reservation/Booking system developed primarily in ReactJs, Spring Boot and MySql and bro chill
          </p>
          {/* Other content goes here */}
        </div>
      </section>

      <div className="footer_copyright">
        © 2023 Copyright:
        
          SparkBus
        
      </div>
    </footer>
  );
}
