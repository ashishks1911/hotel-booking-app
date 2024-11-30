package com.ashish.services;

import com.ashish.models.BookedRoom;

import java.util.List;

public interface BookingService {
    List<BookedRoom> getAllBookingsByRoomId(Long id);

    List<BookedRoom> getAllBookings();

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    String savingBooking(Long roomId, BookedRoom bookingRequest);

    void cancelBooking(Long bookingId);
}
