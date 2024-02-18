package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Seat;
import com.app.entities.Station;

public interface SeatDao extends JpaRepository<Seat, Long> {

}
