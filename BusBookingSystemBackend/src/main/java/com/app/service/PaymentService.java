package com.app.service;

public interface PaymentService {

	boolean initiateRefund(String paymentId,double amount, String reason);
}
