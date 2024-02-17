package com.app.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BusSeatBookings;
import com.app.service.SeatAllocationService;

@RestController
@Secured("ROLE_USER")
@RequestMapping("/passenger")
public class PassengerController {

    @Autowired
    private SeatAllocationService seatAllocationService;
///passenger/bus/{busId}/seat-list
    @GetMapping("/bus/{busId}/seat-list")
    public ResponseEntity<BusSeatBookings> getPassengerListWithSeatNoForBus(@PathVariable long busId) {
        BusSeatBookings busSeatBookings = seatAllocationService.getPassengerListWithSeatNoForBus(busId);
        if (busSeatBookings.getSeatList().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(busSeatBookings, HttpStatus.OK);
    }
}