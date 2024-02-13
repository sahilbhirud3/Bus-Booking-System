package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.BookingDetailsDto;
import com.app.dto.BookingsDto;
import com.app.dto.GetBookingDto;

public interface BookingService {
	
	public ApiResponse addBooking(BookingsDto booking);
	BookingDetailsDto getBookingDetails(long bookingId);
	List<GetBookingDto> getAllBookings(long userid);
//	public ApiResponse cancelBookings(long bookingid);

}
