package com.ashish.repositories;

import com.ashish.models.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<BookedRoom, Long> {
    List<BookedRoom> findByRoomId(Long id);
    Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);
}
