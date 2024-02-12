package com.app.dto;

import java.time.LocalDate;

import com.app.entities.Bookings;
import com.app.entities.Passenger;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@ToString
public class SeatAllocationRequestDto {
	private int seatNo;
	private LocalDate dateOfJourney;
	private Passenger passeneger;
	private Bookings booking;



}
