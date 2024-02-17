package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.BookingDetailsDto;
import com.app.dto.BookingsDto;
import com.app.dto.GetBookingDto;
import com.app.dto.GetBookings;

public interface BookingService {
	
	 ApiResponse addBooking(BookingsDto booking);
	BookingDetailsDto getBookingDetails(long bookingId);
	List<GetBookingDto> getAllUserBookings(long userid);
	 ApiResponse cancelBookings(long bookingid);
	List<GetBookings> getAllBookings();
}
