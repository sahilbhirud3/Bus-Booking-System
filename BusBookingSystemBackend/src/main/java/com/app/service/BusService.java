package com.app.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.app.dto.ApiResponse;
import com.app.dto.GetBusDto;
import com.app.dto.SendBusDto;
import com.app.entities.Bus;


public interface BusService {
	
	 Bus getBusById(long busId);
	ApiResponse addBus(Bus bus,long routeid);
	
	ResponseEntity<?> removeBus(long busId);
	
	List<SendBusDto> getBuses(GetBusDto gbd);
	
	List<SendBusDto> getAllBuses();
	

}
