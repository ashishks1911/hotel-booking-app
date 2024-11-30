package com.ashish.services;

import com.ashish.exceptions.InvalidBookingRequestException;
import com.ashish.models.BookedRoom;
import com.ashish.models.Room;
import com.ashish.repositories.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{
    private final BookingRepository bookingRepository;
    private final RoomService roomService;
    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long id ) {
        return bookingRepository.findByRoomId(id);
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode);
    }

    @Override
    public String savingBooking(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("check-in date must come before check-out date");
        }
        Room room = roomService.getRoomById(roomId);
        List<BookedRoom> existingBookings = room.getBookings();
        boolean isAvailable = isRoomAvailable(bookingRequest, existingBookings);
        if (isAvailable){
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }else{
            throw new InvalidBookingRequestException("This room is not available for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();

    }

    private boolean isRoomAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream().noneMatch( existingBooking ->
                bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())

                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                        && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))

                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
                        && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))

                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
                        && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                        && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))

                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                        && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
        );
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}
