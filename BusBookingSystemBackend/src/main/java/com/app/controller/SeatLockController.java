package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.SeatDto;
import com.app.entities.Seat;
import com.app.service.SeatService;

@RestController
@RequestMapping("/seat")
public class SeatLockController {

	@Autowired
	private SeatService seatService;
	
	
	@PostMapping("/lock")
	public ResponseEntity<String> lockSeat(@RequestBody Seat seat ) {
		if (seatService.lockSeat(seat)) {
			return ResponseEntity.ok("Seats lock successfully");
		} else {
			return ResponseEntity.badRequest().body("unsuccessfull");
		}
	}

	@PostMapping("/unlock")
	public ResponseEntity<String> unlockSeat(@RequestBody SeatDto seat) {
		if (seatService.unlockSeat(seat)) {
			return ResponseEntity.ok("Seat reservation canceled successfully");
		} else {
			return ResponseEntity.badRequest().body("Seat was not reserved");
		}
	}
}