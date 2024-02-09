package com.app.entities;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.ManyToAny;

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
	

	@ManyToOne
	private Bookings booking;

	@Column(unique = true)
	private int seatNo;
	
	@OneToOne
	private  Passenger passenger;
	private LocalDate dateOfJourney;
	
	
	
	
	
	

	
	
	
}
