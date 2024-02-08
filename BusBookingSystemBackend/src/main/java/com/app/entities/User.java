package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "password") // toString excluding password
public class User extends BaseEntity {
	@Column(length = 20)
	private String firstName;
	@Column(length = 20)
	private String lastName;
	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private UserRole role;
	
	@Column(unique = true) 
	private String mobile;
	
	@Column(length = 30,unique = true) 
	@Email(message = "Please provide a valid email address")
	private String email;
	private int age;
	private String gender;
	@Column(length = 300, nullable = false)
	private String password;
}
