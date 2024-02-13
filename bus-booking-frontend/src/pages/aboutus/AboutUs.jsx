import "./AboutUs.css";
import PersonCard from "../../components/PersonCard" ;// Import the PersonCard component
import sahil from "../../assets/images/sahil.jpg";

function AboutUs() {
  return (
    <>
      
      <div className="about_us_container">
        <h1>About Us</h1>
        <div className="card_container">
          <PersonCard
            name="Sahil Bhirud"
            role="Software Engineer"
            imageSrc={sahil}
            linkedinLink="https://www.linkedin.com/in/sahilbhirud/"
          />
          <PersonCard
            name="Pranav Chaudhari"
            role="Software Engineer"
            imageSrc={sahil}
            linkedinLink="https://www.linkedin.com/in/sahilbhirud/"
          />
          <PersonCard
            name="Arjun(Nikhilesh) Sharma"
            role="Software Engineer"
            imageSrc={sahil}
            linkedinLink="https://www.linkedin.com/in/sahilbhirud/"
          />
          <PersonCard
            name="Raaj Chimulkar"
            role="Software Engineer"
            imageSrc={sahil}
            linkedinLink="https://www.linkedin.com/in/sahilbhirud/"
          />
          <PersonCard
            name="Krishna Gite"
            role="Software Engineer"
            imageSrc={sahil}
            linkedinLink="https://www.linkedin.com/in/sahilbhirud/"
          />
        </div>
      </div>
     
    </>
  );
}

export default AboutUs;
