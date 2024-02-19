package com.app.service;

import java.util.List;

import com.app.dto.SeatDto;
import com.app.entities.Seat;

public interface SeatService {

	boolean lockSeat(SeatDto seat);
	List<Integer> getAllSeatsForBus(Long busId);
	boolean unlockSeat(SeatDto seat );
}
