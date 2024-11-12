package com.ashish.services;

import com.ashish.models.BookedRoom;

import java.util.List;

public interface BookingService {
    List<BookedRoom> getAllBookingsByRoomId(Long id);
}
