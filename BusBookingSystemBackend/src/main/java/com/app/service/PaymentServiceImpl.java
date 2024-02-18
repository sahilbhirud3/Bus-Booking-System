package com.app.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Refund;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Value("${razorpay.key.id}")
	private String RAZORPAY_KEY_ID;
	@Value("${razorpay.key.secret}")
	private String RAZORPAY_KEY_SECRET;

	public boolean initiateRefund(String paymentId,double amount, String reason) {
        
		 try {
	            // Create an instance of the Razorpay client
	            RazorpayClient razorpay = new RazorpayClient(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);

	            // Prepare the refund request payload
	            JSONObject refundRequest = new JSONObject();
	            refundRequest.put("amount", amount);
	            refundRequest.put("speed", "optimum");
	            refundRequest.put("reason", reason);
	            //refundRequest.put("receipt", "Receipt No. #31");

	            // Call the refund method
	            Refund payment = razorpay.payments.refund(paymentId, refundRequest);

	            // Check if refund was successful
	            JSONObject response = payment.toJson();
	            if (response.has("id")) {
	                // Refund was successful
	                System.out.println("Refund initiated successfully: " + response);
	                return true;
	                // Handle success response
	            } else {
	                // Refund failed
	                JSONObject error = response.getJSONObject("error");
	                System.out.println("Error initiating refund: " + error.getString("description"));
	                return false;
	                // Handle failure response
	            }
	        } catch (RazorpayException e) {
	            // Handle Razorpay API exception
	            System.out.println("Error initiating refund: " + e.getMessage());
	            return false;
	        }
    }
}
