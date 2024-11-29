import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import AddRoom from './components/AddRoom.jsx'
import Rooms from './components/Rooms.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import EditRoom from './pages/EditRoom.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import RoomListing from './components/RoomListing.jsx'
import Admin from './admin/Admin.jsx'

function App() {

  return (
    <>
      <main>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/edit/:roomId' element={<EditRoom/>} />
            <Route path='/rooms' element={<Rooms/>} />
            <Route path='/rooms/add' element={<AddRoom/>} />
            <Route path='/browse' element={<RoomListing/>} />
            <Route path='/admin' element={<Admin/>} />


          </Routes>
        </BrowserRouter>
        <Footer/>
      </main>
    </>
  )
}

export default App
