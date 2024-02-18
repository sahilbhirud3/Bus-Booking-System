package com.app.service;

import java.util.List;

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
	    // Assuming seatRepository is an instance of your Seat repository or data access object
	    // and it has a method to fetch seat numbers for a given bus ID
	    return seatDao.findSeatNumbersByBusId(busId);
	}
	@Override
	public boolean unlockSeat(SeatDto seatDto) {
		try {

			 List<Seat> seats = seatDao.findByBusIdAndSeatNosIn(seatDto.getBusId(), seatDto.getSeatNos());
		        
		        if (!seats.isEmpty()) {
		            // Delete all retrieved seat entities
		            seatDao.deleteAll(seats);
		            return true;
		        } else {
		            // No matching seat entries found
		            return false;
		        }
			
		} catch (Exception e) {
			// Handle exceptions
			e.printStackTrace();
			return false;
		}
	}
	
	
	

}
