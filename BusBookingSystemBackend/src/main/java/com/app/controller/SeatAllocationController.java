package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BusSeatDetails;
import com.app.entities.Bus;
import com.app.service.BusService;
import com.app.service.SeatAllocationService;


@RestController
@RequestMapping("/seats")


public class SeatAllocationController {
	
	@Autowired
	private SeatAllocationService seatAllocationService;
	@Autowired
	private BusService busService;
	
	@GetMapping("/bus/{busId}")
	public ResponseEntity<BusSeatDetails> getSeatAllocationsByBus(@PathVariable long busId) {
	    List<Integer> seatNumbers = seatAllocationService.getSeatNumbersByBus(busId);
	    Bus bus = busService.getBusById(busId); // Assuming you have a method to retrieve bus details by ID
	    int totalSeats = bus.getTotalSeats(); // Assuming you have a method to get total seats of a bus
	    
	    BusSeatDetails busSeatDetails = new BusSeatDetails();
	    busSeatDetails.setId(bus.getId());
	    busSeatDetails.setBusNo(bus.getBusNo());
	    busSeatDetails.setFrom(bus.getRoute().getStationIdBoarding().getStationName());
	    busSeatDetails.setStartTime(bus.getStartTime());
	    busSeatDetails.setTo(bus.getRoute().getStationIdDestination().getStationName());
	    busSeatDetails.setEndTime(bus.getEndTime());
	    busSeatDetails.setTotalSeats(bus.getTotalSeats());
	    seatNumbers.sort((o1,o2)->o1.compareTo(o2));
	    busSeatDetails.setBookedSeats(seatNumbers);

	    return ResponseEntity.ok(busSeatDetails);
	}
}
