package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Bus;
import com.app.entities.SeatAllocation;
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
	    public ResponseEntity<List<Integer>> getSeatAllocationsByBus(@PathVariable long busId) {
	        List<Integer> seatNumbers = seatAllocationService.getSeatNumbersByBus(busId);
	        return ResponseEntity.ok(seatNumbers);
	    }
}
