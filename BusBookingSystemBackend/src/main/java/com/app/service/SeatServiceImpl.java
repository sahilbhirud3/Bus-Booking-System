package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.SeatDao;
import com.app.dto.SeatDto;
import com.app.entities.Seat;

@Service
@Transactional
public class SeatServiceImpl implements SeatService {

	@Autowired
	private SeatDao seatDao;

	@Override
	public boolean lockSeat(Seat seat) {
		try {
			// Generate a session ID or retrieve it from the session object if available
//	        String sessionId = 

			// Set the sessionId in the Seat object
//	        seat.setSessionId(sessionId);
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

	@Override
	public List<Integer> getAllSeatsForBus(Long busId) {
		// Assuming seatRepository is an instance of your Seat repository or data access
		// object
		// and it has a method to fetch seat numbers for a given bus ID
		List<Seat> seats = seatDao.findSeatByBusId(busId);
		List<Integer> seatNumbers = new ArrayList<>();
		for (Seat seat : seats) {
			seatNumbers.addAll(seat.getSeatNos());
		}
		return seatNumbers;

	}

	@Override
	public boolean unlockSeat(SeatDto seatDto) {
		try {
			Seat seat = seatDao.findByBusId(seatDto.getBusId());
			if (seat != null) {
				List<Integer> updatedSeatNos = seat.getSeatNos().stream()
						.filter(seatNo -> !seatDto.getSeatNos().contains(seatNo)).collect(Collectors.toList());

				seat.setSeatNos(updatedSeatNos);
				seatDao.save(seat);
				return true;
			} else {
				return false; // No seat entry found for the provided busId
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false; // Handle exceptions
		}
	}
}