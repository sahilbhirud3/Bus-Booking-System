package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.StationDao;
import com.app.dto.ApiResponse;
import com.app.dto.GetStationsDto;
import com.app.entities.Station;

@Service
@Transactional
public class StationServiceImpl implements StationService {

	@Autowired
	private StationDao stationDao;

	@Override
	public ApiResponse addStation(Station station) {
		stationDao.save(station);
		return new ApiResponse("Station added Successfully");
	}

	public List<GetStationsDto> mapToDtoList(List<Station> entityList) {
		List<GetStationsDto> dtoList = new ArrayList<>();

		for (Station entity : entityList) {
			GetStationsDto dto = new GetStationsDto();
			dto.setId(entity.getId());
			dto.setStation_name(entity.getStationName());
			// Map other properties

			dtoList.add(dto);
		}

		return dtoList;
	}

	@Override
	public List<GetStationsDto> getStations() {

		List<Station> list = stationDao.findAll();

		List<GetStationsDto> list1 = mapToDtoList(list);

//		GetStationsDto targetListType = new TypeToken<List<GetStationsDto>>() {}.getType();
//		List<GetStationsDto> dtoList = mapper.map(list, targetListType);

//		List<GetStationsDto> listdto = mapper.map(list, new TypeToken<List<GetStationsDto>>() {}.getType());
//		System.out.println(list1.toString());
		return list1;
	}

	@Override
	 public boolean deleteStationById(Long stationId) {
        if (stationDao.existsById(stationId)) {
            // If the station exists, delete it
            stationDao.deleteById(stationId);
            // Log a message indicating successful deletion
            System.out.println("Station with ID " + stationId + " deleted successfully.");
            return true;
        } else {
            // Log a message indicating that the station doesn't exist
            System.out.println("Station with ID " + stationId + " does not exist.");
            return false;
        }
    }
}
