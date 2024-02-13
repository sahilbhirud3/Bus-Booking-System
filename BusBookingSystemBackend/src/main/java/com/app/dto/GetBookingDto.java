package com.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetBookingDto {
	private long id;
	private String busNo;
	private String from;
    private LocalDateTime startTime;
    private String to;
    private LocalDateTime endTime;
    private double totalFare;
    private LocalDateTime bookingDateTime;

	
}
