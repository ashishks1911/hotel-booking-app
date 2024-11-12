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
    }


}
