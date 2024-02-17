package com.app.controller;

import java.util.List;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.BookingDetailsDto;
import com.app.dto.BookingsDto;
import com.app.dto.GetBookings;
import com.app.service.BookingService;

@RestController
@RequestMapping("/bookings")


public class BookingsController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public ResponseEntity<?> addBookings(@RequestBody BookingsDto booking) {
        ApiResponse response = bookingService.addBooking(booking);
        if (response.getStatus() == HttpStatus.CREATED) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response.getMessage());
        } else {
            return ResponseEntity.status(response.getStatus()).body(response.getMessage());
        }
    }

    
    @GetMapping("/getbookings/{userid}")
    public ResponseEntity<?> getAllBookings(@PathVariable long userid){
//    	System.out.println("INside booking"+userid);
    	return ResponseEntity.ok(bookingService.getAllUserBookings(userid));
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

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getbookings")
    public ResponseEntity<?> getAllBookings() {
        try {
            // Retrieve all bookings
            List<GetBookings> allBookings = bookingService.getAllBookings();
            
            // Check if bookings are found
            if (!allBookings.isEmpty()) {
                return ResponseEntity.ok(allBookings);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve bookings.");
        }
    }
 
    @DeleteMapping("/cancelbooking/{bookingid}")
    public  ApiResponse cancelBooking(@PathVariable long bookingid)
    {
    	return bookingService.cancelBookings(bookingid);
    }
    
}
