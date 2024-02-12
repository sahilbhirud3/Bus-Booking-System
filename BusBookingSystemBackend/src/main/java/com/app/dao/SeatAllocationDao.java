package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Bookings;
import com.app.entities.SeatAllocation;

public interface SeatAllocationDao extends JpaRepository<SeatAllocation, Long> {
	
	SeatAllocation findByBooking(Bookings b);
	

}
