package com.app.dto;

import com.app.entities.Passenger;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class SeatNoAndPassengerDto {

	
	private int seatNo;
	private Passenger passenger;
	
	
    
}
