package com.app.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.dao.BusDao;
import com.app.dao.RouteDao;
import com.app.dao.StationDao;
import com.app.dto.ApiResponse;
import com.app.dto.GetBusDto;
import com.app.dto.SendBusDto;
import com.app.entities.Bus;
import com.app.entities.Routes;
import com.app.entities.Station;

@Service
@Transactional
public class BusSeviceImpl implements BusService {
	
	@Autowired
	private BusDao busDao;
	
	
	@Autowired
	private RouteDao routeDao;
	
	@Autowired
	private StationDao stationDao;
	
	@Override
	public Bus getBusById(long busId) {
        return busDao.findById(busId)
                .orElse(null); // Returns null if bus is not found
    }
	
	
	@Override
	public ApiResponse addBus(Bus bus, long routeId) {
	    // Find the route by its ID
	    Routes route = routeDao.findById(routeId)
	            .orElseThrow(() -> new RuntimeException("Route not found."));

	    // Check if a similar bus already exists for the route
	    if (busDao.existsByBusNo(bus.getBusNo())) {
	        throw new RuntimeException("Duplicate bus found.");
	    }

	    // Add the bus to the route and save the route
	    route.addBus(bus);
	    routeDao.save(route);

	    return new ApiResponse("Bus added.");
	}



	@Override
	public ResponseEntity<?> removeBus(long busId) {
	    try {
	        Optional<Bus> optionalBus = busDao.findById(busId);
	        if (optionalBus.isPresent()) {
	            Bus bus = optionalBus.get();
	            busDao.delete(bus);
	            return new ResponseEntity<>("Bus removed successfully", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Bus not found", HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>("Failed to remove bus", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	
	@Override
	public List<SendBusDto> getBuses(GetBusDto getBusInput) {
	    // Get all routes
	    List<Routes> allRoutes = routeDao.findAll();
	    // Get from station
	    Station from = stationDao.findById(getBusInput.getFrom())
	            .orElseThrow(() -> new RuntimeException("Start Station not found."));
	    // Get to station
	    Station to = stationDao.findById(getBusInput.getTo())
	            .orElseThrow(() -> new RuntimeException("Destination Station not found."));
	    // Find route (which includes from -> to)
	    List<Routes> matchingRoutes = allRoutes.stream()
	            .filter(e -> e.getStationIdBoarding() == from && e.getStationIdDestination() == to)
	            .collect(Collectors.toList());

	    if (matchingRoutes.isEmpty()) {
	        // No routes found between the specified stations
	        return List.of();
	    }

	    Routes route = matchingRoutes.get(0);

	    // Get the list of buses from the route
	    List<Bus> buses = route.getBuses();

	    // Filter buses based on the provided date
	    List<Bus> filteredBuses = buses.stream()
	            .filter(bus -> bus.getStartTime().toLocalDate().isEqual(getBusInput.getDate()))
	            .collect(Collectors.toList());
	    // Prepare and return the list of SendBusDto objects
	    return filteredBuses.stream()
	            .map(bus -> {
	                int cost = (int) route.getDistance() * 2;
	                double duration = (double) route.getDistance() * 1.5;
	                String durationString = duration >= 60 ? (duration / 60) + "hr" : duration + "min";
	                String busNo=bus.getBusNo();
	                String fromName = from.getStationName();
	                String toName = to.getStationName();
	                LocalDateTime startTime= bus.getStartTime();
	                LocalDateTime endTime=bus.getEndTime();
	                return new SendBusDto(bus.getId(),busNo, fromName, toName, cost, durationString, startTime, endTime);
	            })
	            .collect(Collectors.toList());
	}

	
	
	

	public List<SendBusDto> getAllBuses() {
	    // Retrieve all buses
	    List<Bus> buses = busDao.findAll();

	    // Prepare and return the list of SendBusDto objects
	    return buses.stream()
	            .map(bus -> {
	                // Assuming the route information is available in the Bus entity
	                Routes route = bus.getRoute();
	                if (route == null) {
	                    // If the route information is not available, handle it accordingly
	                    throw new RuntimeException("Route information not available for bus with ID: " + bus.getId());
	                }
	                int cost = (int) route.getDistance() * 2;
	                double duration = (double) route.getDistance() * 1.5;
	                String durationString = duration >= 60 ? (duration / 60) + "hr" : duration + "min";
	                String busNo=bus.getBusNo();
	                Station from = route.getStationIdBoarding();
	                Station to = route.getStationIdDestination();
	                String fromName = from != null ? from.getStationName() : "Unknown";
	                String toName = to != null ? to.getStationName() : "Unknown";
	                LocalDateTime startTime= bus.getStartTime();
	                LocalDateTime endTime=bus.getEndTime();
	                return new SendBusDto(bus.getId(), busNo , fromName, toName, cost, durationString, startTime, endTime  );
	            })
	            .collect(Collectors.toList());
	}

	
	
	
	
	
}
