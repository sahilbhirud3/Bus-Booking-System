package com.app.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SendBusDto {
	
	private long id;
	private String busNo;
	private String from;
	private String to;
	private int cost;
	//private int availableSeats;
	private String duration;
	private LocalDateTime startTime;
	private LocalDateTime endTime;

}
