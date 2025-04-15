package com.ashish.controllers;

import com.ashish.dto.BookingResponse;
import com.ashish.dto.RoomResponse;
import com.ashish.exception.InvalidInputException;
import com.ashish.exception.ResourceNotFoundException;
import com.ashish.models.BookedRoom;
import com.ashish.models.Room;
import com.ashish.services.BookingService;
import com.ashish.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin("*")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private RoomService roomService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
         List<BookedRoom> bookedRooms =  bookingService.getAllBookings();
         List<BookingResponse> bookingResponses = new ArrayList<>();
         for (BookedRoom booking : bookedRooms){
             BookingResponse bookingResponse = getBookingResponse(booking);
             bookingResponses.add(bookingResponse);
         }
         return ResponseEntity.status(HttpStatus.OK).body(bookingResponses);

    }


    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        try {
               BookedRoom booking =  bookingService.findByBookingConfirmationCode(confirmationCode);
               BookingResponse bookingResponse = getBookingResponse(booking);
               return ResponseEntity.ok(bookingResponse);
        }
        catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PostMapping("/room/{roomId}")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId, @RequestBody BookedRoom bookingRequest){
        try {
            String confirmationCode = bookingService.savingBooking(roomId, bookingRequest);
            return ResponseEntity.status(HttpStatus.OK).body(
                    "Room booked Successfully ! Your Booking Confirmation Code is : "+confirmationCode);
        }catch (InvalidInputException ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/{bookingId}")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room room = roomService.getRoomById(booking.getRoom().getId());
        RoomResponse response = new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice()
        );
        BookingResponse bookingResponse = new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestName(),
                booking.getGuestEmail(),
                booking.getNumOfAdults(),
                booking.getNumOfChildren(),
                booking.getTotalNumOfGuests(),
                booking.getBookingConfirmationCode(),
                response
        );
        return bookingResponse;
    }


}
