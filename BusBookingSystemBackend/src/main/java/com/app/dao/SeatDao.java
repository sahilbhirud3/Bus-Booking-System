package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Seat;

public interface SeatDao extends JpaRepository<Seat, Long> {

	Seat findByBusId(Long busId);

	List<Seat> findSeatByBusId(Long busId);
}
