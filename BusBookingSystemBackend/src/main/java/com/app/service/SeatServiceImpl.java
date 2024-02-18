package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.app.dao.SeatDao;
import com.app.entities.Seat;

public class SeatServiceImpl implements SeatService {

	@Autowired
	private SeatDao seatDao;

	@Override
	public boolean reserveSeat(Seat seat) {
		try {
			Seat newSeat = seatDao.save(seat);
			if (newSeat != null)
				return true;
			return false;
		} catch (Exception e) {
			// Handle exceptions
			e.printStackTrace();
			return false;
		}
	}

}
