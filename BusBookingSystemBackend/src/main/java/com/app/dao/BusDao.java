package com.app.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Bus;
import com.app.entities.Routes;

public interface BusDao extends JpaRepository<Bus, Long>{
	
	Optional<Bus> findByBusNo(int busNo);
	
	List<Bus> findByRoute(Routes r);
	Optional<Bus> findByBusNoAndStartTime(int busNo,LocalDate date);

	Boolean existsByBusNo(String busNo);
}
