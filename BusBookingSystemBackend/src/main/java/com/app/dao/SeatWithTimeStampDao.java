package com.app.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.SeatWithTimeStamp;

public interface SeatWithTimeStampDao extends JpaRepository<SeatWithTimeStamp, Long> {

	List<SeatWithTimeStamp> findByTimestampBefore(LocalDateTime timestamp);
}
