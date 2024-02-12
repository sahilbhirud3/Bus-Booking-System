package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Bus;
import com.app.entities.SeatAllocation;

public interface SeatAllocationDao extends JpaRepository<SeatAllocation, Long> {
	
	 List<SeatAllocation> findByBusId(long busId);
	 boolean existsByBusAndSeatNo(Bus bus, int seatNo);

}
