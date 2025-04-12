import React from 'react'
import MainHeader from '../components/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../components/RoomCarousel'
import RoomSearch from '../common/RoomSearch'

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className='container'>
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <RoomCarousel />
        <HotelService />
        <Parallax />
      </section>
    </section>
  )
}

export default Home