package com.app.service;

import java.util.List;

import com.app.dto.BusSeatBookings;

public interface SeatAllocationService {

//	public ApiResponse allocateSeat(SeatAllocationRequestDto seat) ;
	List<Integer> getSeatNumbersByBus(long busId);	
	BusSeatBookings getPassengerListWithSeatNoForBus(long busId);
}
