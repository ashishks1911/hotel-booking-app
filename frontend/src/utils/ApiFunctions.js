import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:9191"
})

//This function adds a new room to the database 
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)
    console.log(formData);
    const response = await api.post("/rooms", formData);
    if(response.status===201){
        return true;
    }else{
        return false;
    }
}

// This function fetches all room types from the database
export async function getRoomTypes() {
    try{
        const response = await api.get("/rooms/types")
        return response.data;
    }catch(error){
        throw new Error("Error Fetching room types");
    }
}