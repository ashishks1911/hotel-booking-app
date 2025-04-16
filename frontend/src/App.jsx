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
import Checkout from './booking/Checkout.jsx'
import BookingSuccess from './booking/BookingSuccess.jsx'
import Bookings from './booking/Bookings.jsx'
import FindBooking from './booking/FindBooking.jsx'
import Login from './auth/Login.jsx'
import Logout from './auth/Logout.jsx'
import SignUp from './auth/SignUp.jsx'
import { AuthProvider } from './store/AuthProvider'
import Profile from './auth/Profile.jsx'

function App() {

  return (
    <AuthProvider>
      <main>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/edit/:roomId' element={<EditRoom />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/rooms/add' element={<AddRoom />} />
            <Route path='/book/:roomId' element={<Checkout />} />
            <Route path='/browse' element={<RoomListing />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/booking-success' element={<BookingSuccess />} />
            <Route path='/bookings' element={<Bookings />} />
            <Route path='/my-bookings' element={<FindBooking />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />


          </Routes>
        </BrowserRouter>
        <Footer />
      </main>
    </AuthProvider>
  )
}

export default App
