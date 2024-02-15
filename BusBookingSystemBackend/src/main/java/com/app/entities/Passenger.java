package com.app.entities;

import javax.persistence.Entity;

import org.springframework.beans.factory.annotation.Autowired;

import com.app.dto.Signup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Passenger extends Base{
	

	private String firstName;
	private String lastName;
	private String gender;
	private int age;
	
	
	
	


}
