package com.app.dto;

import com.app.entities.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter	
@AllArgsConstructor
@NoArgsConstructor
public class GetUserDto {

	private String firstName;

	private String lastName;


	private String mobile;

	private String email;

	private int age;
	private String gender;
}
