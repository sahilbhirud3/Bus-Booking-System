package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.GetStationsDto;
import com.app.entities.BusDetails;
import com.app.entities.Station;

public interface StationService {

	ApiResponse addStation(Station station);
	
	List<GetStationsDto> getStations();
	
//	void getStations();

}
