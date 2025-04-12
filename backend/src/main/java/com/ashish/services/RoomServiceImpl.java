package com.ashish.services;

import com.ashish.dto.RoomResponse;
import com.ashish.exceptions.InternalServerException;
import com.ashish.exceptions.ResourceNotFoundException;
import com.ashish.models.Room;
import com.ashish.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class RoomServiceImpl implements RoomService{
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws IOException, SQLException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if(!file.isEmpty()){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.getDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllTheRooms() throws SQLException {
        List<Room> list =  roomRepository.findAll();
        return list;
    }



    @Override
    public byte[] getRoomPhotoByRoomId(Long id) throws SQLException {
        Optional<Room> room  = roomRepository.findById(id);
        if (room.isEmpty()){
            throw new ResourceNotFoundException("Room Not Found!!!");
        }
        Blob blob = room.get().getPhoto();
        if (blob!=null)
            return blob.getBytes(1, (int) blob.length());
        return null;
    }

    @Override
    public void deleteRoomById(Long roomId) {
        Optional<Room> room = roomRepository.findById(roomId);
        if (room.isPresent())
            roomRepository.deleteById(roomId);
        else
            throw new ResourceNotFoundException("Room Not Found with id :" + roomId);
    }

    @Override
    public Room updateRoom(Long roomId, MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException, InternalServerException {
        byte[] photoBytes = photo!=null && !photo.isEmpty()? photo.getBytes() : getRoomPhotoByRoomId(roomId);

        Room room  = roomRepository.findById(roomId).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        if (roomType!=null) room.setRoomType(roomType);
        if (roomPrice!=null) room.setRoomPrice(roomPrice);
        if(photoBytes!=null && photoBytes.length > 0 ) {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            }catch (SQLException e){
                throw new InternalServerException("Error updating room");
            }
        }
        Room savedRoom = roomRepository.save(room);
        return savedRoom;
    }

    @Override
    public Room getRoomById(Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new ResourceNotFoundException("Room not Found"));
        return room;
    }
    @Override
    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType){
        return roomRepository.findAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType);
    }

}
