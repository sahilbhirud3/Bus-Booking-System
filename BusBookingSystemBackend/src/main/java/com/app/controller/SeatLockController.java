package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Seat;
import com.app.service.SeatService;

@RestController
@RequestMapping("/seat")
public class SeatLockController {

	@Autowired
	private SeatService seatService;
	
	
	@PostMapping("/lock")
	public ResponseEntity<String> reserveSeat(@RequestBody Seat seat ) {
		if (seatService.reserveSeat(seat)) {
			return ResponseEntity.ok("Seats reserved successfully");
		} else {
			return ResponseEntity.badRequest().body("Seats is not available or already reserved");
		}
	}

//	@PostMapping("/seats/{seatId}/cancel-reservation")
//	public ResponseEntity<String> cancelReservation(@PathVariable Long seatId) {
//		if (seatService.cancelReservation(seatId)) {
//			return ResponseEntity.ok("Seat reservation canceled successfully");
//		} else {
//			return ResponseEntity.badRequest().body("Seat was not reserved");
//		}
//	}
}