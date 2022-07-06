import React from 'react'
import './list.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import RoomDatatable from '../../components/datatable/RoomDatatable'

const List = ({roomColumns}) => {
  return (
    <div className='list'>
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <RoomDatatable columns={roomColumns} />
        </div>
    </div>
  )
}

export default List