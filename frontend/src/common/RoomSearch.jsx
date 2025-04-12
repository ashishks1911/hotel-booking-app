import React, { useState } from 'react'
import RoomSearchResult from './RoomSearchResult'
import { Form, Button, Col, Container, Row } from 'react-bootstrap'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { getAvailableRooms } from '../utils/ApiFunctions'
import moment from 'moment'

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: ""
  })
  const [availableRooms, setAvailableRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value })
    const checkInDate = moment(searchQuery.checkInDate)
    const checkOutDate = moment(searchQuery.checkOutDate)
    if (checkInDate.isValid() && checkOutDate.isValid()) {
      setErrorMessage("")
    }
  }

  const handleClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: ""
    })
    setAvailableRooms([])
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const checkInDate = moment(searchQuery.checkInDate)
    const checkOutDate = moment(searchQuery.checkInDate)
    if (!checkInDate.isValid() || !checkOutDate.isValid()) {
      setErrorMessage("Please enter valid dates")
      return
    }
    setIsLoading(true)
    getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
      .then((data) => {
        setAvailableRooms(data)
        setTimeout(() => setIsLoading(false), 2000)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })

  }

  return (
    <div>
      <Container className="shadow mt-5 mb-5 py-5">
        <Form  onSubmit={handleSearch}>
          <Row className='justify-content-center'>
            <Col md={3} xs={12}>
              <Form.Group className="mb-3" controlId="checkInDate">
                <Form.Label>Check-In Date</Form.Label>
                <Form.Control type="date" 
                  name="checkInDate"
                  value={searchQuery.checkInDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </Form.Group>
            </Col>
            <Col md={3} xs={12}>
              <Form.Group className="mb-3" controlId="checkOutDate">
                <Form.Label>Check-In Date</Form.Label>
                <Form.Control type="date"
                  name="checkOutDate"
                  value={searchQuery.checkOutDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </Form.Group>
            </Col>

            <Col md={3} xs={12}>
              <Form.Group controlId="roomType">
                <Form.Label>Room Type</Form.Label>
                <div className="d-flex">
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={searchQuery}
                  />
                  <Button variant="secondary" type="submit" className="ml-2">
                    Search
                  </Button>
                </div>
              </Form.Group>
            </Col>

          </Row>
        </Form>
        {isLoading ? (
          <p className="mt-4">Finding availble rooms....</p>
        ) : availableRooms ? (
          <RoomSearchResult results={availableRooms} onClearSearch={handleClearSearch} />
        ) : (
          <p className="mt-4">No rooms available for the selected dates and room type.</p>
        )}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </Container>
    </div>
  )
}

export default RoomSearch
