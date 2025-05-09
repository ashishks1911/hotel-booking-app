import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom'

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  })

  const [imagePreview, setImagePreview] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let val = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(val)) {
        parseInt(val);
      } else {
        val = "";
      }
    }
    //using spread syntax ...used for shallow copy
    console.log([name]);
    setNewRoom({ ...newRoom, [name]: val })
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      if (success !== undefined) {
        setSuccessMessage("A new room has been added to the database");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" })
        setImagePreview("");
        setErrorMessage("");
      }
      else {
        setErrorMessage("Error adding room");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }

    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)

  }


  return (
    <>
      <section className='container mt-5 mb-5'>
        <div className='row justify-content-center'>

          <div className='col-md-8 lg-6'>

            <h2 className='mt-5 mb-2'>Add New Room</h2>

            {successMessage && (
              <div className='alert alert-success fade show'>{successMessage}</div>
            )}

            {errorMessage && (
              <div className='alert alert-danger fade show'>{errorMessage}</div>
            )}

            <form action="" onSubmit={handleSubmit} >

              <div className='mb-3'>
                <label htmlFor='roomType' className='form-label'>
                  Room Type
                </label>
                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom}
                  />
                </div>
              </div>

              <div className='mb-3'>
                <label htmlFor='roomPrice' className='form-label'>
                  Room Price
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='roomPrice'
                  name='roomPrice'
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                  required
                />
              </div>
              <div></div>
              <div className='mb-3'>
                <label htmlFor='photo' className='form-label'>
                  Room Photo
                </label>
                <input
                  type="file"
                  className='form-control'
                  id='photo'
                  name='photo'
                  onChange={handleImageChange} />
                {imagePreview && (
                  <img src={imagePreview}
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "600px" }}
                    className='mb-3'
                  />
                )}

              </div>
              <div className='d-grid d-md-flex mt-2'>
                <Link to={"/rooms"} className='btn btn-outline-info ml-5'>Back</Link>
                <button className='btn btn-outline-primary ml-5'>Save Room</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddRoom;
