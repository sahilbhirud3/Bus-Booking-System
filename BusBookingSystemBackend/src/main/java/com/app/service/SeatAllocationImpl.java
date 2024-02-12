package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.BookingsDao;
import com.app.dao.PassengerDao;
import com.app.dao.SeatAllocationDao;
import com.app.dto.ApiResponse;
import com.app.dto.SeatAllocationRequestDto;
import com.app.entities.Bookings;
import com.app.entities.Passenger;
import com.app.entities.SeatAllocation;

@Service
@Transactional
public class SeatAllocationImpl implements SeatAllocationService{

//	@Autowired
//	private SeatAllocationDao seatAllocateDao;
	
//	@Autowired
//	private SeatAllocationDao s;
//	
//	@Autowired
//	private PassengerDao passengerDao;
//	
//	@Autowired
//	private BookingsDao bookingDao;
//	
//	@Override
//	public ApiResponse allocateSeat(SeatAllocationRequestDto seat) {
//		SeatAllocation seatAllocation=new SeatAllocation();
//		seatAllocation.setDateOfJourney(seat.getDateOfJourney());
////		System.out.println(seat.getPassenegerId());
////		System.out.println(seat.getBookingId());
//		seatAllocation.setSeatNo(seat.getSeatNo());
//		System.out.println(seat.getPasseneger().getFirstName());
////		Passenger p=passengerDao.findById(seat.getPassenegerId()).orElseThrow(()-> new RuntimeException("Passenger Not Found"));
////		Bookings book=bookingDao.findById(seat.getBookingId()).orElseThrow(()-> new RuntimeException("Booking Not Found"));
//		seatAllocation.setBooking(seat.getBooking());
//		seatAllocation.setPassenger(seat.getPasseneger());
//		
////		book.addSeat(seatAllocation);
//		seat.getBooking().addSeat(seatAllocation);
////		seatAllocateDao.save(seatAllocation);
//		s.save(seatAllocation);
//		return new ApiResponse("Seat Allocated");
//	}

	
	
}
