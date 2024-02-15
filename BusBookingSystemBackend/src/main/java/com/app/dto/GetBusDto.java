package com.app.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetBusDto {
	
	private String busNo;
	private long from;
	private long to;
	private LocalDate date;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	

}
