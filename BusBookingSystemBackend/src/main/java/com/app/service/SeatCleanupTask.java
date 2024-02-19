package com.app.service;

import java.time.LocalDateTime;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SeatCleanupTask {

	// Define the executor service
	private final ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

	@Autowired
	private SeatService seatService;

//	@PostConstruct
//	public void startSeatCleanupTask() {
//		
//		// Schedule the cleanup task to run every 1 minutes
//		executorService.scheduleAtFixedRate(() -> {
//			System.out.println("CleanUp seat Task Running" + LocalDateTime.now());
//			// Execute your database cleanup logic here
//			seatService.seatCleanup();
//		}, 0, 1, TimeUnit.SECONDS);
//	}
}
