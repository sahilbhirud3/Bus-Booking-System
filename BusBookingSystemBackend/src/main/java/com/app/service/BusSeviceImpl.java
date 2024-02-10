package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.app.dao.BusDao;
import com.app.dao.RouteDao;
import com.app.dao.StationDao;
import com.app.dto.ApiResponse;
import com.app.entities.Bus;
import com.app.entities.Routes;

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
	public ApiResponse removeBus(int busNo) {
		Bus bd = busDao.findByBusNo(busNo).orElseThrow(()->new RuntimeException("bus details not found."));
		busDao.delete(bd);
		return new ApiResponse("bus details deleted");
	}

	//@Override
	/*public List<SendBusDto> getBus(GetBusDto g) {
		
		List<Routes> list = routeDao.findAll();
		
		Station from = stationDao.findById(g.getFrom()).orElseThrow(()->new RuntimeException("Start Station not found."));
		
		Station to = stationDao.findById(g.getTo()).orElseThrow(()->new RuntimeException("Destination Station not found."));
		
//		list.stream().filter(e -> e.getStation_id_boarding() == from && 
//				e.getStation_id_destination() == to ).forEach(e->System.out.println(e.getDistance()*2));
		
		List<Routes> l= list.stream().filter(e -> e.getStation_id_boarding() == from && 
				e.getStation_id_destination() == to ).collect(Collectors.toList());
		
		List<Bus> buses = busDao.findByRoute(l.get(0));
		
		List<SendBusDto> sendBusDtoList = new ArrayList<SendBusDto>();
		
		for (Bus bus : buses) {
			int cost = (int)l.get(0).getDistance()*2;
			double d = (double)l.get(0).getDistance()*1.5;
			String duration;
			if(d>=60) {
				duration = String.valueOf(d/60)+"hr";
			}
			else {
				duration = String.valueOf(d)+"min";
			}
			
			String from1 = from.getStation_name();
			String to1 = to.getStation_name();
			int seats = seat.getAvailable_seats();
			SendBusDto sendbusobj = new SendBusDto(bus.getId(),from1, to1, cost, seats,duration);
			sendBusDtoList.add(sendbusobj);
		}
		
		System.out.println(sendBusDtoList.get(0).getCost());
		
     	System.out.println("In get bus service");
//		System.out.println(buses.get(0).getBusNo());
//		Routes s = routeDao.findByBoardingAndDestination(g.getFrom(), g.getTo());
//		System.out.println(r.toString());
		
		return sendBusDtoList;
	}

	*/
}
