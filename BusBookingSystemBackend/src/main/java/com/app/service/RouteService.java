package com.app.service;

import java.util.List;

import com.app.dto.AddRouteDto;
import com.app.dto.ApiResponse;
import com.app.dto.GetRouteResp;

public interface RouteService {
	
	ApiResponse addRoute(AddRouteDto ard);
	ApiResponse deleteRoute(long routeid);
	List<GetRouteResp> getRoutes();

}