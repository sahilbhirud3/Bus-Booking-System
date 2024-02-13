package com.app.dto;

import java.util.List;

import com.app.entities.Passenger;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SeatPassengerDto {

	
	private int seatNo;
	private PassengerDto passenger;
	
}
