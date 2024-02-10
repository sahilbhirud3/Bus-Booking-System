package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Passenger;
import com.app.entities.User;

public interface PassengerDao extends JpaRepository<Passenger, Long> {

}
