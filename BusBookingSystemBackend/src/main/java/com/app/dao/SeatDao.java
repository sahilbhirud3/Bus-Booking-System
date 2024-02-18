package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Seat;

public interface SeatDao extends JpaRepository<Seat, Long> {

	List<Seat> findByBusIdAndSeatNosIn(long busId, List<Integer> seatNos);
	List<Integer> findSeatNumbersByBusId(Long busId);
}
