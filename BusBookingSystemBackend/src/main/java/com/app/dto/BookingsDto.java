package com.app.dto;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class BookingsDto {

	String paymentId;
	String razorpayOrderId;
	String razorpaySignature;
	private long busId;
	private long userId;
	private double fare;
	
	private List<SeatPassengerDto> seatPassengerList;
	
	


}
