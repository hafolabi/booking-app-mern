import React, { useState } from "react";
import "./newUser.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import axios from "axios"
import { axiosInstance } from "../../config"

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({})
  const [imgUpload, setImgUpload] = useState(false)
  const [succUpload, setSuccUpload] = useState("")
  const [maxSize, setMaxSize] = useState(false)
  const [error, setError] = useState(false)


  const handleChange = (e) => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    setImgUpload(false);
    setMaxSize(false);
    setError(false);
    e.preventDefault()
    if (file) {
      if (file.size < 500 * 1024){
      const data = new FormData();
      data.append("file", file)
      data.append("upload_preset", "upload")
      try {
        setImgUpload(true)
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/theinsights-dev/image/upload",
          data
        );
        const { url } = uploadRes.data
        const newUser = {
          ...info,
          img: url,
        }
        const res = await axiosInstance.post("/auth/register", newUser)
        url && setImgUpload(false)
        setSuccUpload(url)
        res.data && window.location.replace("/users")
      } catch (err) {
        setError(true)
        setImgUpload(false)
      }
    }else{
      setMaxSize(true)
    }
    } else
      try {
        const res = await axiosInstance.post("/auth/register", info)
        res.data && window.location.replace("/users")
      } catch (err) {
        setError(true)
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
                file
                  ? URL.createObjectURL(file)
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
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
             
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    id={input.id}
                    required={true}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <button type="submit">send</button>
            </form>
            {imgUpload && 
                <div style={{ color: "red", marginTop: "20px", marginBottom: "20px", fontSize:"13px"  }}>
                 please wait image is uploading...
                </div>
              }

            {succUpload &&
              <div style={{ color: "teal", marginTop: "20px", marginBottom: "20px", fontSize:"13px"  }}>
                image upload successfull...
              </div>
            }
           
             { maxSize &&
              <div style={{ color: "red", marginTop: "20px", marginBottom: "20px", fontSize:"13px" }}>
                  image size exceeded 500kb try a smaller image
                </div>
              }

              {error &&
               <div style={{ color: "red", marginTop: "20px", marginBottom: "20px", fontSize:"13px" }}>
                  Something went wrong
              </div>
              }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
