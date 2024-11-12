import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
  const [roomTypes, setRoomTypes] = useState([""])
  const [showNewRoomTypesInput, setShowNewRoomTypesInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("")

  useEffect(() => {
    getRoomTypes().then((data) => {
      if(data.length!==0)
        setRoomTypes(data)
    })
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  }

  const handleNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setShowNewRoomTypesInput(false);
    }
  }

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select name="roomType" 
          id="roomType"
          className="form-select"
          value={newRoom.roomType}
          required
          onChange={(e)=>{
            if(e.target.value === "Add New"){
              setShowNewRoomTypesInput(true);
            }else{
              handleRoomInputChange(e)
            }
          }}>
            <option value={""}>Select a room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          {showNewRoomTypesInput && (
            <div className="input-group">
              <input type="text"
              className="form-control" 
              placeholder="Enter a new Room Type"
              onChange={handleNewRoomTypeInputChange}
              />
              <button className="btn btn-hotel" 
              type="button"
              onClick={handleNewRoomType}>
                Add
              </button>
            </div>
          )}

        </div>
      )}
    </>
  )

}

export default RoomTypeSelector;