package com.ashish.services;

import com.ashish.dto.RoomResponse;
import com.ashish.exceptions.InternalServerException;
import com.ashish.models.Room;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;


public interface RoomService {
    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException;

    List<String> getAllRoomTypes();

    List<RoomResponse> getAllTheRooms() throws SQLException;
    byte[] getRoomPhotoByRoomId(Long id) throws SQLException;

    void deleteRoomById(Long roomId);

    RoomResponse updateRoom(Long roomId, MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException, InternalServerException;

    RoomResponse getRoomById(Long roomId);
}
