import React from 'react'
import './new.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import {DriveFolderUploadOutlined} from '@mui/icons-material'

const New = () => {
  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              alt=""
            />
          </div>

          <div className="right">
            <form>
            <div className="formInput">
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlined className='icon' />
                </label>
                <input type="file" id='file' style={{display:'none',}} />
              </div>

              <div className="formInput">
                <label>Username</label>
                <input type="text" placeholder='adams' />
              </div>

              <div className="formInput">
                <label>Name and Surname</label>
                <input type="text" placeholder='Adams Babs' />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input type="text" placeholder='adams"gmail.com' />
              </div>

              <div className="formInput">
                <label>Phone</label>
                <input type="text" placeholder='+234-806-389-3054' />
              </div>

              <div className="formInput">
                <label>Password</label>
                <input type="password" placeholder='****' />
              </div>

              <div className="formInput">
                <label>Adress</label>
                <input type="text" placeholder='vic st., sleek, igbe, ikd Lagos' />
              </div>

              <div className="formInput">
                <label>Country</label>
                <input type="text" placeholder='Nigeria' />
              </div>

              <button>send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New