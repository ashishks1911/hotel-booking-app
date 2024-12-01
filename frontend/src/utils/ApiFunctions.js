import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9191"
})

//This function adds a new room to the database 
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)
    console.log(formData);
    const response = await api.post("/rooms", formData);
    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
}

// This function fetches all room types from the database
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/types")
        return response.data;
    } catch (error) {
        throw new Error("Error Fetching room types");
    }
}

export async function getAllRooms() {
    try {
        const response = await api.get("/rooms");
        return response.data;

    } catch (error) {
        throw new Error("Error fetching rooms");
    }

}

// This function deletes the room by id
export async function deleteRoom(roomId) {
    try {
        const response = await api.delete(`/rooms/${roomId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error Deleting room ${error.message}`);
    }
}

export async function updateRoom(roomId, room) {
    try {
        const formData = new FormData();
        formData.append("photo", room.photo)
        formData.append("roomType", room.roomType)
        formData.append("roomPrice", room.roomPrice)

        const result = await api.put(`/rooms/${roomId}`, formData)
        return result.data
    } catch (error) {
        throw new Error('Error Updating room')
    }
}

export async function getRoomById(roomId) {
    try {
        const response = await api.get(`/rooms/${roomId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error getting room by id : ${roomId}`)
    }
}

export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}`, booking);
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}

export async function getAllBookings() {
    try {
        const response = await api.get(`/bookings`);
        return response.data
    } catch (error) {
        throw new Error(`Error fetching bookings :  ${error.message}`)
    }
}

export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const response = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error find booking : ${error.message}`)
        }
    }

}

export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/${bookingId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking : ${error.message}`)
    }
    
}