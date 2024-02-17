package com.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PassengerDto {

	 @NotBlank(message = "First name is required")
	    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
	    private String firstName;

	    @NotBlank(message = "Last name is required")
	    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
	    private String lastName;

	    @NotBlank(message = "Gender is required")
	    @Pattern(regexp = "^(?:male|female)$", message = "Gender must be 'male' or 'female'")
	    private String gender;

	    @NotNull(message = "Age is required")
	    @PositiveOrZero(message = "Age must be a positive number or zero")
	    private int age;

}
