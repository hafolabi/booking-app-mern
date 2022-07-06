import React, { useState, useEffect } from "react";
import "./newRoom.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch"
import { axiosInstance } from "../../config"

const NewRoom = ({ inputs, title }) => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(null)
  const [hotelName, setHotelName] = useState("")
  const { data, loading } = useFetch("/hotels")
  const [rooms, setRooms] = useState([])

  const handleChange = (e) => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  useEffect(()=>{
    const item1 = ()=>{
      try{
       const item3 = data.filter(item=>(item._id === hotelId))
        setHotelName(item3[0].name)
      }catch(err){}
    }
    item1()
  },[data, hotelId])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room)=>({number:room}))
    try{
      const res = await axiosInstance.post(`/rooms/${hotelId}`, {
        ...info, 
        roomNumbers, 
        hotelId, 
        hotelName
      })
      res.data && window.location.replace("/rooms")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    id={input.id}
                    placeholder={input.placeholder}
                    required={true}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="formInput" >
                  <label>Rooms</label>
                  <textarea 
                    onChange={e=>setRooms(e.target.value)} 
                    placeholder="give comma between room numbers"
                  />
              </div>

              <div className="formInput" >
                  <label>Choose a Hotel</label>
                  <select id="hotelId" onChange={(e)=>setHotelId(e.target.value)} required={true}>
                    <option>-</option>
                    {loading ? "loading" : data && data.map(hotel=>(
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                    
                  </select>
                </div>

              <button type="submit">send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
