package com.ashish.controllers;

import com.ashish.dto.RoomResponse;
import com.ashish.models.Room;
import com.ashish.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
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
    public ResponseEntity<List<RoomResponse>> getAllRoomList() throws SQLException {
        List<RoomResponse> list = roomService.getAllTheRooms();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @DeleteMapping("{roomId}")
    public ResponseEntity<Void> deleteRoomById(@PathVariable("roomId") Long roomId){
        roomService.deleteRoomById(roomId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/roomId")
    public ResponseEntity<RoomResponse> updateRoom(
            @PathVariable Long roomId,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        RoomResponse response = roomService.updateRoom(roomId, photo, roomType, roomPrice);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId){
        RoomResponse roomResponse = roomService.getRoomById(roomId);
        return ResponseEntity.ok(Optional.of(roomResponse));
    }

}
