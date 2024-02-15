package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.BusDao;
import com.app.dao.SeatAllocationDao;
import com.app.dto.BusSeatBookings;
import com.app.dto.SeatNoAndPassengerDto;
import com.app.entities.Bus;
import com.app.entities.Passenger;
import com.app.entities.Routes;
import com.app.entities.SeatAllocation;
import com.app.entities.User;

@Service
@Transactional
public class SeatAllocationImpl implements SeatAllocationService{

	@Autowired
	private SeatAllocationDao seatAllocationDao;
	
	@Autowired
	private BusDao busDao;
	
	public List<Integer> getSeatNumbersByBus(long busId) {
        // Retrieve seat numbers by bus ID from the repository
        List<SeatAllocation> seatAllocations = seatAllocationDao.findByBusId(busId);
        
        // Extract seat numbers from seat allocations
        List<Integer> seatNumbers = seatAllocations.stream()
                .map(SeatAllocation::getSeatNo)
                .collect(Collectors.toList());
        
        return seatNumbers;
    }

	public BusSeatBookings getPassengerListWithSeatNoForBus(long busId) {
	    List<SeatAllocation> seatAllocations = seatAllocationDao.findByBusId(busId);
	    Bus bus = busDao.findById(busId).orElseThrow(()->new RuntimeException("Bus Not Found")); // Fetch bus information

	    BusSeatBookings busSeatBookings = new BusSeatBookings();
	    busSeatBookings.setBusNo(bus.getBusNo());
	    busSeatBookings.setTotalSeats(bus.getTotalSeats());
	    busSeatBookings.setStartTime(bus.getStartTime());
	    busSeatBookings.setEndTime(bus.getEndTime());

	    Routes route = bus.getRoute();
	    busSeatBookings.setFrom(route.getStationIdBoarding().getStationName());
	    busSeatBookings.setTo(route.getStationIdDestination().getStationName());

	    List<SeatNoAndPassengerDto> seatNoAndPassengerDtoList = new ArrayList<>();

	    for (SeatAllocation seatAllocation : seatAllocations) {
	        Passenger passenger = seatAllocation.getPassenger();
//	        passenger.setMobileNo(user.getMobile());
	        int seatNo = seatAllocation.getSeatNo();
	        
	        seatNoAndPassengerDtoList.add(new SeatNoAndPassengerDto(seatNo, passenger));
	    }

	    busSeatBookings.setSeatList(seatNoAndPassengerDtoList);

	    return busSeatBookings;
	}

	
}
