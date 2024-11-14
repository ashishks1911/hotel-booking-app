package com.ashish.services;

import com.ashish.models.BookedRoom;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class BookingServiceImpl implements BookingService{

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return new ArrayList<>();
    }
}
