import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions'
import BookingTable from './BookingTable';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setTimeout(() => {
      getAllBookings()
        .then((data) => {
          setBookingInfo(data)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error.message)
          setIsLoading(false)
        })
    }, 1000)
  }, [bookingInfo]);

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const data = await getAllBookings();
      console.log("hi" + data);
      setBookingInfo(data);
    }
    catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className='container' style={{ backgroundColor: "whitesmoke" }}>
      <Header title={'Existing Bookings'} />
      {error && <div className='text-danger'>{error}</div>}
      {isLoading ? (<div>Loading...</div>) : (
        <BookingTable bookingInfo={bookingInfo} handleBookingCancellation={handleBookingCancellation} />
      )}
    </section>
  )
}

export default Bookings
