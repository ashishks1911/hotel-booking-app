import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import AddRoom from './components/AddRoom.jsx'
import Rooms from './components/Rooms.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import EditRoom from './pages/EditRoom.jsx'

function App() {

  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/edit/:roomId' element={<EditRoom/>} />
            <Route path='/rooms' element={<Rooms/>} />
            <Route path='/rooms/add' element={<AddRoom/>} />

          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
