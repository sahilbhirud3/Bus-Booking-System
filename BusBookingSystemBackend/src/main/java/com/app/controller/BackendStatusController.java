package com.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
	public class BackendStatusController {

	    @GetMapping("/check-backend-status")
	    public String checkBackendStatus() {
	        // Perform checks to determine backend status
	        // For simplicity, let's return a JSON response indicating the status
	        return "{\"status\": \"online\"}"; 
	    }
	}

