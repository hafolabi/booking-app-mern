import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featuredChart/Featured'
import Chart from '../../components/normalChart/Chart'
import './home.scss'
import Table from '../../components/table/Table'

const Home = () => {
  return (
    <div className='home'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className='widgets'>
            <Widget type='user' />
            <Widget type='order' />
            <Widget type='earning' />
            <Widget type='balance' />
          </div>

          <div className='charts'>
            <Featured />
            <Chart aspect={2 / 1} title='Last 6 Months (Revenue)' />
          </div>

          <div className='listContainer'>
            <div className='listTitle'>Latest Transaction</div>
            <Table />
          </div>
        </div>
    </div>
  )
}

export default Home