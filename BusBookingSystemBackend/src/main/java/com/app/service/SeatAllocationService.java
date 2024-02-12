package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.SeatAllocationRequestDto;
import com.app.entities.Bus;
import com.app.entities.SeatAllocation;

public interface SeatAllocationService {

//	public ApiResponse allocateSeat(SeatAllocationRequestDto seat) ;
	List<Integer> getSeatNumbersByBus(long busId);	

}
