package com.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.app.entities.Base;
import com.app.entities.Bus;
import com.app.entities.SeatAllocation;
import com.app.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class GetBookings {

	private long bookingId;
	private String paymentId;
	private String razorpayOrderId;
	private String razorpaySignature;
	private String busNo;
	private long busId;
	private double totalFare;
	private long userId;
	private String userName;
	private LocalDateTime bookingDateTime;
	private int noOfSeats; 

}
