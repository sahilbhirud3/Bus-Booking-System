package com.app.controller;

import java.util.Date;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.BookingsDto;
import com.app.dto.OrderRequest;
import com.app.service.BookingService;
import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/payment")

public class PaymentController {

	@Autowired
	private BookingService bookingService;
	private final String RAZORPAY_KEY_ID = "rzp_test_bTDnw950m7Mzb4";
	private final String RAZORPAY_KEY_SECRET = "Ofo6i1ubo9JftV1zEW8q1rQz";

	@PostMapping("/razorpay")
	public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
		try {
			RazorpayClient client = new RazorpayClient(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);
			JSONObject options = new JSONObject();
			options.put("amount", request.getAmount() * 100); // amount in paisa
			options.put("currency", "INR");
			options.put("receipt", "order_rcptid_" + System.currentTimeMillis());
			options.put("payment_capture", 1); // auto capture payment

			Order order = client.orders.create(options);
			System.out.println("Order Details" + order);
			return ResponseEntity.ok().body(order.toString());
		} catch (RazorpayException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PostMapping("/verify-payment")
	public ResponseEntity<?> verifyPayment(@RequestBody BookingsDto requestBody) {
		try {

			boolean paymentCaptured = verifyPaymentStatus(requestBody.getPaymentId());
			if (paymentCaptured) {
				// Payment is successful, proceed with storing data
				ApiResponse response = bookingService.addBooking(requestBody);
				System.out.println(
						requestBody.getPaymentId() + " " + requestBody.getFare() + " " + requestBody.getBusId());
				return ResponseEntity.ok().body(Map.of("success", true));
			} else {
				// Payment is not successful
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Payment verification failed"));
		}
	}

	private boolean verifyPaymentStatus(String paymentId) {
		try {
			RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);
			Payment payment = razorpayClient.payments.fetch(paymentId);
			String paymentStatus = payment.get("status");
			return "captured".equals(paymentStatus);
		} catch (RazorpayException e) {
			e.printStackTrace();
			// Handle exceptions
			return false; // Return false in case of any error
		}
	}

}
