import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import RoomTypeSelector from '../common/RoomTypeSelector'

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  })

  const [imagePreview, setImagePreview] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const { roomId } = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  }
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
    setRoom({ ...room, [name]: val })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        setSuccessMessage("Room Updated Successfully!!!");
        const updatedRoom = await getRoomById(roomId);
        setRoom(updatedRoom);
        setImagePreview(updatedRoom.photo);
        setErrorMessage("");
      }
      else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message);
    }
  }

  useEffect(()=>{
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId)
        console.log(roomData)
        setRoom(roomData)
        setImagePreview(roomData.photo)
        
      } catch (error) {
        console.error("Error getting room")
      }
    }
    
    fetchRoom()
  }, [roomId])


  setTimeout(() => {
    setSuccessMessage("")
    setErrorMessage("")
  }, 3000)

  return (
    <div>
      <div className='container mt-5 mb-5'>
        <div className='row justify-content-center'>

          <div className='col-md-8 lg-6'>

            <h2 className='mt-5 mb-2'>Edit Room</h2>

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
                    newRoom={room}
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
                  value={room.roomPrice}
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
                <button className='btn btn-outline-primary ml-5'>Save Room</button>
              </div>


            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditRoom
