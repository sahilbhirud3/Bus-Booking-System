package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BusDto;
import com.app.dto.GetBusDto;
import com.app.dto.SendBusDto;
import com.app.entities.Bus;
import com.app.entities.SeatAllocation;
import com.app.service.BusService;

@RestController
@RequestMapping("/bus")
public class BusController {

	@Autowired
	private BusService busService;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/addbus/{routeid}")
	public ResponseEntity<?> addBus(@RequestBody BusDto busDto, @PathVariable long routeid) {

		// Log the bus details
		System.out.println(busDto.toString());

		// Convert BusDto to Bus entity if needed
		Bus bus = convertToBusEntity(busDto);

		// Call the service to add the bus
		busService.addBus(bus, routeid);

		// Return a success response
		return ResponseEntity.ok("Bus added successfully");

	}
	

	@GetMapping("/getbuses")
	public List<SendBusDto> getBuses(@RequestBody GetBusDto gbd) {
		return busService.getBuses(gbd);
	}

	
	
	@GetMapping("/getallbuses")
	public List<SendBusDto> getAllBuses() {

		return busService.getAllBuses();
	}
	
	
	
	
	
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deletebus/{busId}")
	public ResponseEntity<?> removeBus(@PathVariable long busId) {
	    return ResponseEntity.ok(busService.removeBus(busId));
	}


	

	private Bus convertToBusEntity(BusDto busDto) {
		// Implement the conversion logic from BusDto to Bus entity
		// For simplicity, you can create a method in BusService or use a mapper
		// library.
		// Example:
		Bus bus = new Bus();
		bus.setBusNo(busDto.getBusNo());
		bus.setTotalSeats(busDto.getTotalSeats());
		bus.setStartTime(busDto.getStartTime());
		bus.setEndTime(busDto.getEndTime());
		// Set other properties as needed

		return bus;
	}

}
