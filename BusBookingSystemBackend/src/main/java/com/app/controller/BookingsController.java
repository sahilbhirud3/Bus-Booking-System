package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.BookingDetailsDto;
import com.app.dto.BookingsDto;
import com.app.service.BookingService;

@RestController
@RequestMapping("/bookings")


public class BookingsController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public ResponseEntity<?> addBookings(@RequestBody  BookingsDto booking) {
        ApiResponse createdBooking = bookingService.addBooking(booking);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }
    
    @GetMapping("/getbookings/{userid}")
    public ResponseEntity<?> getAllBookings(@PathVariable long userid){
    	System.out.println("INside booking"+userid);
    	return ResponseEntity.ok(bookingService.getAllBookings(userid));
    }
    @GetMapping("/getbooking/{bookingId}")
    public ResponseEntity<?> getBookingDetails(@PathVariable long bookingId) {
        try {
            // Retrieve booking details by ID
        	BookingDetailsDto bookingDetails = bookingService.getBookingDetails(bookingId);
            
            // Check if booking details are found
            if (bookingDetails != null) {
                return ResponseEntity.ok(bookingDetails);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve booking details.");
        }
    }

 
//    @DeleteMapping("/cancelbooking/{bookingid}")
//    public  ApiResponse cancelBooking(@PathVariable long bookingid)
//    {
//    	return bookingService.cancelBookings(bookingid);
//    }
    
}
