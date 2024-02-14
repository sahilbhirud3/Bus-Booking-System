import { Carousel } from "react-bootstrap";
import "./CardCarousel.css"; // Import your custom CSS file for styling
import CardImage from "../../assets/images/card.jpg";

function CardCarousel() {
  return (
    <Carousel className="custom-carousel" interval={1400}  indicators={false}>
      <Carousel.Item>
        <div className="card-group">
          <div className="card">
            <img src={CardImage} alt="Offer 1" />
            <h2>Bus Tickets Offer</h2>
            <h3>FIRST BUS</h3>
            <p>Save up to Rs 250 on bus tickets</p>
            <p>Valid till 29 Feb</p>
          </div>
          <div className="card">
            <img src={CardImage} alt="Offer 2" />
            <h2>Bus Tickets Offer</h2>
            <h3>FIRST BUS</h3>
            <p>Save up to Rs 250 on bus tickets</p>
            <p>Valid till 29 Feb</p>
          </div>
          <div className="card">
            <img src={CardImage} alt="Offer 3" />
            <h2>Bus Tickets Offer</h2>
            <h3>FIRST BUS</h3>
            <p>Save up to Rs 250 on bus tickets</p>
            <p>Valid till 29 Feb</p>
          </div>
          
        </div>
      </Carousel.Item>

      <Carousel.Item> 
      <div className="card-group">
          <div className="card">
            <img src={CardImage} alt="Offer 1" />
            <h2>Bus Tickets Offer</h2>
            <h3>FIRST BUS</h3>
            <p>Save up to Rs 250 on bus tickets</p>
            <p>Valid till 29 Feb</p>
          </div>
          <div className="card">
            <img src={CardImage} alt="Offer 2" />
            <h2>Bus Tickets Offer</h2>
            <h3>FIRST BUS</h3>
            <p>Save up to Rs 250 on bus tickets</p>
            <p>Valid till 29 Feb</p>
          </div>
          <div className="card">
            <img src={CardImage} alt="Offer 3" />
            <h2>Bus Tickets Offer</h2>
            <h3>FIRST BUS</h3>
            <p>Save up to Rs 250 on bus tickets</p>
            <p>Valid till 29 Feb</p>
          </div>
          
        </div>
      </Carousel.Item>
      

      {/* Add more Carousel.Item for additional sets of cards */}
    </Carousel>
  );
}

export default CardCarousel;
