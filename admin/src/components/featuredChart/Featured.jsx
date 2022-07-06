import React from 'react'
import {KeyboardArrowUp, KeyboardArrowDown, MoreVert} from '@mui/icons-material'
import './featured.scss'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const feature = () => {
  return (
    <div className='featured'>
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVert fontSize='small' />
      </div>

      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={'70%'} strokeWidth={5}/>
        </div>
        <p className="title">Total sales Today</p>
        <p className="amount">$510</p>
        <p className="desc">
          Previous Transaction in progress, Last payments may not be included
        </p>

        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>

            <div className="itemResult positive">
              <KeyboardArrowUp fontSize='small'/>
              <div className="resultAmount">$23.2k</div>
            </div>

          </div>

          <div className="item">
            <div className="itemTitle">Last Week</div>

            <div className="itemResult positive">
              <KeyboardArrowUp fontSize='small'/>
              <div className="resultAmount">$17.2k</div>
            </div>
            
          </div>

          <div className="item">
            <div className="itemTitle">Last Month</div>

            <div className="itemResult negative">
              <KeyboardArrowDown fontSize='small'/>
              <div className="resultAmount">$-20.2k</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default feature