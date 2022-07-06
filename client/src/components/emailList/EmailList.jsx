import React from 'react'
import './emailList.css'

const EmailList = () => {
  return (
    <div className='emailList'>
      <div className="emailContainer">
        <h1 className='emailTitle'>Save time Save money!</h1>
        <span className="emailDesc">Sign up and we will send the best deals to you</span>
        <div className="emailInputContainer">
            <input type="text" placeholder='Your Email' />
            <button>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default EmailList