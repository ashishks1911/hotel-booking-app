package com.ashish.repositories;

import com.ashish.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> getDistinctRoomTypes();

    @Query("SELECT r FROM Room r where r.roomType LIKE %:roomType% AND r.id NOT IN (" +
            "SELECT br.room.id FROM BookedRoom br " +
            "WHERE (br.checkInDate<=:checkInDate) AND (br.checkOutDate>=:checkOutDate) "+
            ")")
    List<Room> findAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
}
