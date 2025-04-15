package com.ashish.services;

import com.ashish.models.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;


public interface RoomService {
    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException;

    List<String> getAllRoomTypes();

    List<Room> getAllTheRooms() throws SQLException;
    byte[] getRoomPhotoByRoomId(Long id) throws SQLException;

    void deleteRoomById(Long roomId);

    Room updateRoom(Long roomId, MultipartFile photo, String roomType, BigDecimal roomPrice) throws Exception;

    Room getRoomById(Long roomId);

    List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
}
