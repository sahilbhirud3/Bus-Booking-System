package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Bookings extends Base{

	
	private int start;
	private int end;
	private int busNo;
	private LocalDate date;
	@ManyToOne
	private User user; //User Relationship
	@ManyToOne
	private Passenger passenger;  //Passenger Relationship
	@ManyToOne
	private Routes routes;    //Route Relationship
	
	
	@OneToMany(mappedBy = "booking",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<SeatAllocation> seatlist = new ArrayList<SeatAllocation>();
	
	public void addSeat(SeatAllocation s) {
		seatlist.add(s);//parent to child 
		s.setBooking(this);//child to parent 
	}
	
	public void removeSeat(SeatAllocation s) {
		seatlist.remove(s);
		s.setBooking(null);
	}
	
	
	
}
