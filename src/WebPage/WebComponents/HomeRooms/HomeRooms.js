import React from 'react'
import "./HomeRooms.css"
import CategoryData from '../Data/CategoryData'
import RoomCard from './RoomCard'

const HomeRooms = () => {

  return (
    <div className='HomeRooms'>
      <h4>THE CAPPA LUXURY HOTEL</h4>
      <h2>Rooms & Suites</h2>
      <div className="HomeRooms-boxes">
        {CategoryData.map((item) => (
          <RoomCard id={item.id} title={item.title} price={item.price} cover={item.cover}/>
        ))}
      </div>
    </div>
  )
}

export default HomeRooms
