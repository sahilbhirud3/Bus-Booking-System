package com.app.service;

import com.app.dto.ApiResponse;
import com.app.entities.Bus;


public interface BusService {
	
	ApiResponse addBus(Bus bus,long routeid);
	
	ApiResponse removeBus(int busNo);
	
	//List<SendBusDto> getBus(GetBusDto gbd);

}
