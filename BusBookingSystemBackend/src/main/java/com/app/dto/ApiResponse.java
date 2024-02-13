package com.app.dto;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//DTO :  resp DTO : to send API resp from rest server ---> rest clnt
@NoArgsConstructor
@Getter
@Setter
public class ApiResponse {
	private LocalDateTime timeStamp;
	private String message;
	private HttpStatus status;

	public ApiResponse(String message) {
		super();
		this.message = message;
		this.timeStamp=LocalDateTime.now();
	}
	 public ApiResponse(String message, HttpStatus created) {
	        this.message = message;
	        this.status = created;
	        this.timeStamp = LocalDateTime.now();
	    }
	
}
