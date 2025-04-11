import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container mt-5">
      <h2>Welcome to Admin Panel</h2>
      <hr />
      <Link to={'/rooms'}>Manage Rooms</Link><br />
      <Link to={'/rooms/add'}>Add Room</Link> <br />
      <Link to={'/bookings'}>View Bookings</Link>



    </div>
  )
}

export default Admin;