package com.app.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BusSeatDetails {

	private  long id; 
	private String busNo;
	private String from;
    private LocalDateTime startTime;
    private String to;
    private LocalDateTime endTime; 
    private int totalSeats;
    List<Integer> bookedSeats=new ArrayList<>();
}
