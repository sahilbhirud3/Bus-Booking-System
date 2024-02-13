package com.app.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.SeatNoAndPassengerDto;
import com.app.service.SeatAllocationService;

@RestController
@RequestMapping("/passenger")
public class PassengerController {

    @Autowired
    private SeatAllocationService seatAllocationService;
///passenger/bus/{busId}/seat-list
    @GetMapping("/bus/{busId}/seat-list")
    public ResponseEntity<List<SeatNoAndPassengerDto>> getPassengerListWithSeatNoForBus(@PathVariable long busId) {
        List<SeatNoAndPassengerDto> seatNoAndPassengerDto = seatAllocationService.getPassengerListWithSeatNoForBus(busId);
        if(seatNoAndPassengerDto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(seatNoAndPassengerDto, HttpStatus.OK);
    }
}