package com.app.service;

import com.app.dto.SeatDto;
import com.app.entities.Seat;

public interface SeatService {

	boolean lockSeat(Seat seat);
	boolean unlockSeat(SeatDto seat );
}
