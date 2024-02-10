package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Routes;
import com.app.entities.Station;

public interface RouteDao  extends JpaRepository<Routes, Long>{
	
//	List<Routes> findByStation_id_boardingAndStation_id_destination();
	Optional<Routes> findByStationIdBoardingAndStationIdDestination(Station from,Station to);
	
	 

}
