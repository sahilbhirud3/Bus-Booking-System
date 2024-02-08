package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.UserEntity;

public interface UserEntityDao extends JpaRepository<UserEntity,Long>{
//derived finder 
	Optional<UserEntity> findByEmail(String email);
}
