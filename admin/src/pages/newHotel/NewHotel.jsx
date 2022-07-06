import React, { useState } from "react";
import "./newHotel.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import useFetch from "../../hooks/useFetch"
import axios from 'axios'
import { axiosInstance } from "../../config"

const NewHotel = ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState([])
  const { data, loading } = useFetch("/rooms")
  const [imgUpload, setImgUpload] = useState(false)
  const [error, setError] = useState(false)
  const [succUpload, setSuccUpload] = useState("")
  const [checkFile, setCheckFile] = useState(false)


  const handleChange = (e) => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value)
    setRooms(value)
  }

  const handleSubmit = async (e) => {
    setImgUpload(false);
    setError(false);
    setCheckFile(false);
    e.preventDefault();
    if (files) {
      try {
        setImgUpload(true)
        const list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file)
            data.append("upload_preset", "upload")
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/theinsights-dev/image/upload",
              data
            );
            const { url } = uploadRes.data
            return url
          })
        )
        const newHotel = {
          ...info,
          rooms,
          photo: list
        }
        const res = await axiosInstance.post("/hotels", newHotel)
        list && setImgUpload(false)
        setSuccUpload(list)
        res.data && window.location.replace("/hotels")
      } catch (err) {
        setError(true)
        setImgUpload(false)
      }
    } else {
      setCheckFile(true)
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
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    id={input.id}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" required={true} multiple onChange={handleSelect}>

                  {loading ? "loading" : data && data.map(room => (
                    <option key={room._id} value={room._id}>
                      {room.title}
                    </option>
                  ))}

                </select>
              </div>

              <button type="submit">send</button>
            </form>

            {checkFile ?
              <div style={{ color: "red", marginTop: "20px", marginBottom: "20px", fontSize: "13px" }}>
                "please select images to upload..."
              </div>
              : ""
            }

            {imgUpload &&
              <div style={{ color: "red", marginTop: "20px", marginBottom: "20px", fontSize: "13px" }}>
                please wait image is uploading...
              </div>
            }

            {succUpload &&
              <div style={{ color: "teal", marginTop: "20px", marginBottom: "20px", fontSize: "13px" }}>
                image upload successfull...
              </div>
            }

            {error &&
              <div style={{ color: "red", marginTop: "20px", marginBottom: "20px", fontSize: "13px" }}>
                Something went wrong
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
