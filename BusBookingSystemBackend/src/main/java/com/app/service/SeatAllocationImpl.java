package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.SeatAllocationDao;
import com.app.dto.SeatNoAndPassengerDto;
import com.app.entities.Passenger;
import com.app.entities.SeatAllocation;

@Service
@Transactional
public class SeatAllocationImpl implements SeatAllocationService{

	@Autowired
	private SeatAllocationDao seatAllocationDao;
	
	
	
	public List<Integer> getSeatNumbersByBus(long busId) {
        // Retrieve seat numbers by bus ID from the repository
        List<SeatAllocation> seatAllocations = seatAllocationDao.findByBusId(busId);
        
        // Extract seat numbers from seat allocations
        List<Integer> seatNumbers = seatAllocations.stream()
                .map(SeatAllocation::getSeatNo)
                .collect(Collectors.toList());
        
        return seatNumbers;
    }

	 public List<SeatNoAndPassengerDto> getPassengerListWithSeatNoForBus(long busId) {
	        List<SeatAllocation> seatAllocations = seatAllocationDao.findByBusId(busId);
	        List<SeatNoAndPassengerDto> seatNoAndPassengerDto = new ArrayList<>();

	        for (SeatAllocation seatAllocation : seatAllocations) {
	            Passenger passenger = seatAllocation.getPassenger();
	            int seatNo = seatAllocation.getSeatNo();
	            seatNoAndPassengerDto.add(new SeatNoAndPassengerDto(seatNo,passenger));
	        }

	        return seatNoAndPassengerDto;
	    }
	
	
}
