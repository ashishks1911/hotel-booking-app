import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import AddRoom from './components/AddRoom.jsx'
import Rooms from './components/Rooms.jsx'

function App() {

  return (
    <>
      <AddRoom/>
      <Rooms />
    </>
  )
}

export default App
