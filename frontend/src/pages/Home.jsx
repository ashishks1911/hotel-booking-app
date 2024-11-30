import React from 'react'
import MainHeader from '../components/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className='container'>
        <Parallax />
        <HotelService />
        <Parallax />
      </section>
    </section>
  )
}

export default Home