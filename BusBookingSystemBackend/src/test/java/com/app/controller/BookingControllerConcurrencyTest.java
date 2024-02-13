package com.app.controller;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.app.service.BookingService;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
public class BookingControllerConcurrencyTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private BookingService bookingService;

    @InjectMocks
    private BookingsController bookingController;

    @Test
    public void testConcurrentSeatBooking() throws Exception {
        int numThreads = 5; // Number of concurrent threads

        // CountDownLatch to synchronize the start of threads
        CountDownLatch latch = new CountDownLatch(1);

        // ExecutorService to manage threads
        ExecutorService executor = Executors.newFixedThreadPool(numThreads);

        // Define the seat number for which concurrent booking attempts will be made
        int seatNo = 1;

        for (int i = 0; i < numThreads; i++) {
            executor.submit(() -> {
                try {
                    latch.await(); // Wait until all threads are ready to start concurrently
                    // Send a POST request to simulate concurrent booking attempts for the same seat
                    mockMvc.perform(MockMvcRequestBuilders.post("/bookings/book")
                            .contentType("application/json")
                            .content("{\"userId\":1,\"busId\":1,\"fare\":50,\"seatPassengerList\":[{\"seatNo\":" + seatNo + ",\"passenger\":{\"name\":\"John\"}}]}"))
                            .andExpect(result -> {
                                // Log the response status and content
                                System.out.println("Status: " + result.getResponse().getStatus());
                                System.out.println("Response Content: " + result.getResponse().getContentAsString());
                            });
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }

        latch.countDown(); // Release all threads to start concurrently
        executor.shutdown();
    }
}
