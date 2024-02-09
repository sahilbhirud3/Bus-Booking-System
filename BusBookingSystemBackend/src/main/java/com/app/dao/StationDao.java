package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Station;

public interface StationDao extends JpaRepository<Station, Long>{
	
	Optional<Station> findByStationName(String s);

}
