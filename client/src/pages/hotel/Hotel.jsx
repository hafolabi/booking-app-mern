import React, { useContext, useState } from "react";
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import EmailList from "../../components/emailList/EmailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../components/hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]
  const [slideIndex, setSlideIdndex] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading } = useFetch(`/hotels/find/${id}`);

  const {dates, options} = useContext(SearchContext)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2){
    // const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const timeDiff = Math.abs(new Date(date2).getTime() - new Date(date1).getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays
  }

  const days = dayDifference(dates[0].endDate,  dates[0].startDate)

  const handleOpen = (i) => {
    setSlideIdndex(i);
    setOpenSlider(true);
  };

  const handleMove = (direction) => {
    let newSlideIndex;

    if (direction === "l") {
      newSlideIndex = slideIndex === 0 ? 5 : slideIndex - 1;
    } else {
      newSlideIndex = slideIndex === 5 ? 0 : slideIndex + 1;
    }
    setSlideIdndex(newSlideIndex);
  };

  const handleClick=()=>{
    if (user){
      setOpenModal(true)
    }else{navigate("/login")}
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? "Loading..." : (
        <div className="hotelContainer">
        {openSlider && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={(e) => setOpenSlider(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideIndex]} alt="" className="slideImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper">
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>

            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <EmailList />
        <Footer />
      </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
