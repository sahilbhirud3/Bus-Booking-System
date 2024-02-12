package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class SeatAllocation extends Base {

//	private LocalDate dateOfJourney;

	@ManyToOne
	private Bookings booking;

	private int seatNo;

	@OneToOne
	private Passenger passenger;
	
	@ManyToOne
	private Bus bus;

}
