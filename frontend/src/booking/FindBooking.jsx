import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'
import moment from 'moment'

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("")
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const emptyBookingInfo = {
    id: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: ""
  }
  const [bookingInfo, setBookingInfo] = useState(emptyBookingInfo);


  const handleInputChange = (event) => {
    setConfirmationCode(event.target.value)
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setIsLoading(false)

    } catch (error) {
      setBookingInfo(emptyBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
    setTimeout(() => setIsLoading(false), 2000);
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setIsDeleted(true);
      setSuccessMessage("Booking Cancelled Successfully.")
      setBookingInfo(emptyBookingInfo);
      setConfirmationCode("");
      setError(null);

    } catch (error) {
      setError(error.message)
    }

    setTimeout(() => {
      setIsDeleted(false);
      setSuccessMessage("");
    }, 5000);
  }

  return (
    <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-center mb-4">Find My Booking</h2>
      <form onSubmit={handleFormSubmit} className="col-md-6">
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            id="confirmationCode"
            name="confirmationCode"
            value={confirmationCode}
            onChange={handleInputChange}
            placeholder="Enter the booking confirmation code"
          />

          <button type="submit" className="btn btn-hotel input-group-text">
            Find booking
          </button>
        </div>
      </form>
      {isLoading ? (
        <div>Finding your bookings ...</div>
      ) : error ? (
        <div>Error : {error}</div>
      ) : bookingInfo.bookingConfirmationCode ? (<div className='col-md-4 mt-4 mb-5'>
        <table className='table table-bordered'>
          <thead>
            <tr className='text-center'>
              <th colSpan={2}><h3>Booking Information</h3></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Confirmation Code</td>
              <td>{bookingInfo.bookingConfirmationCode}</td>
            </tr>
            <tr>
              <td>Room Number</td>
              <td>{bookingInfo.room.id}</td>
            </tr>
            <tr>
              <td>Room Type</td>
              <td>{bookingInfo.room.roomType}</td>
            </tr>
            <tr>
              <td></td>
              <td>{moment(bookingInfo.checkInDate).format("MMM DD, YYYY")}</td>
            </tr>
            <tr>
              <td>Full Name</td>
              <td>{bookingInfo.guestName}</td>
            </tr>
            <tr>
              <td>Email Address</td>
              <td>{bookingInfo.guestEmail}</td>
            </tr>
            <tr>
              <td>Adults</td>
              <td>{bookingInfo.numOfAdults}</td>
            </tr>
            <tr>
              <td>Children</td>
              <td>{bookingInfo.numOfChildren}</td>
            </tr>
            <tr>
              <td>Total Guest</td>
              <td>{bookingInfo.totalNumOfGuests}</td>
            </tr>
            <tr>
              <td colSpan={2}>{
                !isDeleted && <button className='btn btn-danger'
                  onClick={() => handleCancelBooking(bookingInfo.id)}>
                  Cancel Booking
                </button>
              }
              </td>
            </tr>
          </tbody>
        </table>


      </div>
      ) : ''}
      {isDeleted && <div className='alert alert-success'> {successMessage} </div>}

    </div>
  )
}

export default FindBooking
