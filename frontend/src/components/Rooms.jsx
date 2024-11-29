import React, { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [roomsPerPage, setRoomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [selectedRoomType, setSelectedRoomType] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    fetchRooms()
  }, []);


  const fetchRooms = async () => {
    setIsLoading(true)
    try {
      const response = await getAllRooms();
      setRooms(response);
      setIsLoading(false);

    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const handleDelete = async (roomId) => {
    try {
      const response = await deleteRoom(roomId)
      if (response === '') {
        setSuccessMessage(`Room No ${roomId} was deleted`);
        fetchRooms()
      } else {
        console.log(`Error deleting room : ${response.message}`)
      }

    } catch (error) {
      setErrorMessage(error.message)
    }
    setTimeout(() => {
      setErrorMessage("")
      setSuccessMessage("")
    }, 3000)
  }
  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms)
    } else {
      const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
      setFilteredRooms(filtered)
    }
    setCurrentPage(1)

  }, [rooms, selectedRoomType]);


  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  }

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOFirstRoom, indexOfLastRoom);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      {isLoading ? (
        <p> Loading Rooms</p>
      ) : (
        <>
          <section className="my-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Existing Rooms</h2>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Link to={"/rooms/add"}>
                  <FaPlus />Add Room
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="text-center">
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                    <td className="gap-2">
                      <Link to={`/edit/${room.id}`}>
                        <span className="btn btn-info btn-sm mx-1">
                          {/* View */}
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm mx-1">
                          {/* Edit */}
                          <FaEdit />
                        </span>
                      </Link>

                      <button className="btn btn-danger btn-sm mx-1"
                        onClick={() => handleDelete(room.id)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
              onPageChange={handlePaginationClick}

            />
          </section>
        </>
      )}
    </>
  )
}

export default Rooms;