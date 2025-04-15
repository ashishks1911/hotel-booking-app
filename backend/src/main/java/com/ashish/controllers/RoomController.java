package com.ashish.controllers;

import com.ashish.dto.BookingResponse;
import com.ashish.dto.RoomResponse;
import com.ashish.models.BookedRoom;
import com.ashish.models.Room;
import com.ashish.services.BookingService;
import com.ashish.services.RoomService;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private BookingService bookingService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {

        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(),
                savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/types")
    public ResponseEntity<List<String>> getAllRoomTypes(){
        List<String> roomTypes = roomService.getAllRoomTypes();
        return ResponseEntity.status(HttpStatus.OK).body(roomTypes);
    }

    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAllRoomList() throws Exception {
        List<Room> list = roomService.getAllTheRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for(Room room : list){
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            if (photoBytes!=null && photoBytes.length > 0){
                String base64Photo = Base64.encodeBase64String(photoBytes);
                RoomResponse response = getRoomResponse(room);
                response.setPhoto(base64Photo);
                roomResponses.add(response);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(roomResponses);
    }

    @DeleteMapping("{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRoomById(@PathVariable("roomId") Long roomId){
        roomService.deleteRoomById(roomId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/roomId")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> updateRoom(
            @PathVariable Long roomId,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws Exception {
        Room response = roomService.updateRoom(roomId, photo, roomType, roomPrice);
        return ResponseEntity.status(HttpStatus.OK).body(getRoomResponse(response));
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId) throws Exception {
        Room roomResponse = roomService.getRoomById(roomId);
        return ResponseEntity.ok(Optional.of(getRoomResponse(roomResponse)));
    }

    @GetMapping("/available-rooms")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkOutDate,
            @RequestParam String roomType) throws Exception {
        List<Room> roomResponses = roomService.getAvailableRooms(checkInDate, checkOutDate, roomType);
        List<RoomResponse> response = new ArrayList<>();
        for (Room room : roomResponses){
            response.add(getRoomResponse(room));
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private RoomResponse getRoomResponse(Room room) throws Exception {
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
                throw new Exception("Error retriving photo");
            }
        }
        return new RoomResponse(room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                photoBytes,
                bookingInfo);

    }
}
