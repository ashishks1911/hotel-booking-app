package com.ashish.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestName;
    private String guestEmail;
    private Integer NumOfChildren;
    private Integer NumOfAdults;
    private Integer totalNumOfGuests;
    private String bookingConfirmationCode;
    private RoomResponse room;

    public BookingResponse(Long id, LocalDate checkInDate, LocalDate checkOutDate,
                           String bookingConfirmationCode) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
