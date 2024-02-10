package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.RouteDao;
import com.app.dao.StationDao;
import com.app.dto.AddRouteDto;
import com.app.dto.ApiResponse;
import com.app.dto.GetRouteResp;
import com.app.entities.Routes;
import com.app.entities.Station;

@Service
@Transactional
public class RouteServiceImpl implements RouteService {

	@Autowired
	private StationDao stationDao;
	
	@Autowired
	private RouteDao routeDao;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addRoute(AddRouteDto ard) {
		
		Station from = stationDao.findById(ard.getStationIdFrom()).orElseThrow(()->new RuntimeException("Station not found."));
		Station to = stationDao.findById(ard.getStationIdTo()).orElseThrow(()->new RuntimeException("Station not found."));
		Routes r = new Routes();
		r.setStationIdBoarding(from);
		r.setStationIdDestination(to);
		r.setDistance(ard.getDistance());
		
		Routes r1 = routeDao.save(r);
		return new ApiResponse("Route Added");
	}

	@Override
	public ApiResponse deleteRoute(long routeid) {
		routeDao.deleteById(routeid);
		return new ApiResponse("Route Deleted Successfully");
	}

	@Override
	public List<GetRouteResp> getRoutes() {
		List<GetRouteResp> l=new ArrayList<GetRouteResp>();
		List<Routes> list=routeDao.findAll();
		for(Routes a:list)
		{
			GetRouteResp g=new GetRouteResp();
			g.setDistance(a.getDistance());
			g.setId(a.getId());
			Station boarding=stationDao.findById(a.getStationIdBoarding().getId()).orElseThrow(()->new RuntimeException("Station Boarding Not Found"));
			Station destination=stationDao.findById(a.getStationIdDestination().getId()).orElseThrow(()->new RuntimeException("Station Destination Not Found"));
            g.setFrom(boarding.getStationName());
            g.setTo(destination.getStationName());
            l.add(g);

			//l.add(mapper.map(a, GetRouteResp.class));
		}
		return l;
	}

}