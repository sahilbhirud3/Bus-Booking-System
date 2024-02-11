package com.app.dao;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Bus;
import com.app.entities.Routes;

public interface BusDao extends JpaRepository<Bus, Long>{
	
	Optional<Bus> findByBusNo(int busNo);
	
	List<Bus> findByRoute(Routes r);
	Optional<Bus> findByBusNoAndStartTime(int busNo,LocalDate date);

	Boolean existsByBusNo(String busNo);
	
	 @Query("SELECT b FROM Bus b " +
	           "JOIN b.route r " +
	           "WHERE r = :route " +
	           "AND :date BETWEEN b.startTime AND b.endTime")
	    List<Bus> findByRouteAndOperational(@Param("route") Routes route, @Param("date") LocalDate date);
	
}
