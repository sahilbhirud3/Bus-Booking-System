import SearchForm from "../../components/searchform/SearchForm";


function Home() {
  return (
    <>
    <div className="outlet_container">
      <div className="background_image">
        <SearchForm />
      </div>
      <div className="card_container">
        <span className="card">
          {/* Image and description goes here */}
          <img src="card_image.jpg" alt="Card" />
          <p>Random Description</p>
        </span>
      </div>
      <div className="reviews_container">
        {/* <Reviews /> */}
      </div>
    </div>




    <p>
    India&apos;s No. 1 Online Bus Ticket Booking Site
    </p>

    {/* <BusDetailsCard/> */}
    
    </>
  )
}

export default Home