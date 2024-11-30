import React from 'react'
import MainHeader from '../components/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../components/RoomCarousel'

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className='container'>
        <Parallax />
        <RoomCarousel/>
        <HotelService />
        <Parallax />
      </section>
    </section>
  )
}

export default Home