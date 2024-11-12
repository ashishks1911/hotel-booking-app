package com.ashish.services;

import com.ashish.dto.BookingResponse;
import com.ashish.dto.RoomResponse;
import com.ashish.exceptions.PhotoRetrivalException;
import com.ashish.exceptions.ResourceNotFoundException;
import com.ashish.models.BookedRoom;
import com.ashish.models.Room;
import com.ashish.repositories.RoomRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class RoomServiceImpl implements RoomService{
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingService bookingService;
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
    public List<RoomResponse> getAllTheRooms() throws SQLException {
        List<Room> list =  roomRepository.findAll();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for(Room room : list){
            byte[] photoBytes = getRoomPhotoByRoomId(room.getId());
            if (photoBytes!=null && photoBytes.length > 0){
                String base64Photo = Base64.encodeBase64String(photoBytes);
                RoomResponse response = getRoomResponse(room);
                response.setPhoto(base64Photo);
                roomResponses.add(response);
            }
        }
        return roomResponses;

    }

    private RoomResponse getRoomResponse(Room room) {
        List<BookedRoom> bookings = bookingService.getAllBookingsByRoomId(room.getId());
        List<BookingResponse> bookingInfo = bookings.stream()
                .map(booking -> {
                    return new BookingResponse(booking.getBookingId(), booking.getCheckInDate(), booking.getCheckOutDate()
                            , booking.getBookingConfirmationCode());
                }).toList();
        byte[] photoBytes = null;
        Blob blob =  room.getPhoto();
        if (blob!=null){
            try{
                photoBytes =  blob.getBytes(1L, (int) blob.length());
            }catch (Exception e){
                throw  new PhotoRetrivalException("Error retriving photo");
            }
        }
        return new RoomResponse(room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                photoBytes,
                bookingInfo);

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

}
