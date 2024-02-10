package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Bookings;
import com.app.entities.User;

public interface BookingsDao extends JpaRepository<Bookings, Long>{
	
	Optional<List<Bookings>> findByUser(User u);

}
