package com.app.dto;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.app.entities.UserRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Signup {
	@JsonProperty(access = Access.READ_ONLY) // this property only used during ser.
	private Long id;
	@NotBlank(message = "First Name required")
	private String firstName;
	@NotBlank(message = "Last Name required")
	private String lastName;
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid Email!!!")
	private String email;
	@NotBlank(message = "Mobile number is required")
	@Pattern(regexp = "^\\+?[0-9]{10}$", message = "Invalid Mobile number ")
	private String mobile;
	@NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    private Integer age;
    
    @NotBlank(message = "Gender is required")
    @Pattern(regexp = "^(Male|Female|Other)$", message = "Invalid gender")
    private String gender;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	
	@JsonProperty(access=Access.READ_ONLY)
	@Enumerated(EnumType.STRING)
	private UserRole role=UserRole.ROLE_CUSTOMER;
	
	public Signup(String firstName, String lastName,
			String email, String password, UserRole role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
	

	
	
	
	
}
