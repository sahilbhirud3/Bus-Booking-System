package com.app.service;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.app.dao.BusDao;
import com.app.dao.SeatDao;
import com.app.dto.SeatDto;
import com.app.entities.Bus;
import com.app.entities.Seat;
import com.app.entities.SeatWithTimeStamp;

@Service
@Transactional
public class SeatServiceImpl implements SeatService {

    @Autowired
    private SeatDao seatDao;

    @Autowired
    private BusDao busDao;

    @Override
    public boolean lockSeat(SeatDto seatDto) {
        try {
            Bus bus = busDao.findById(seatDto.getBusId())
                    .orElseThrow(() -> new RuntimeException("Bus Not Found"));

            Seat existingSeat = seatDao.findByBusId(seatDto.getBusId());
            if (existingSeat != null) {
                List<SeatWithTimeStamp> seatsWithTimeStamp = seatDto.getSeatNos().stream()
                        .map(seatNo -> {
                            SeatWithTimeStamp seatWithTimeStamp = new SeatWithTimeStamp();
                            seatWithTimeStamp.setSeatNo(seatNo);
                            seatWithTimeStamp.setTimestamp(LocalDateTime.now());
                            return seatWithTimeStamp;
                        }).collect(Collectors.toList());

                existingSeat.getSeats().addAll(seatsWithTimeStamp);
                seatDao.save(existingSeat);
                return true;
            } else {
                Seat newSeat = new Seat();
                newSeat.setBus(bus);
                List<SeatWithTimeStamp> seatsWithTimeStamp = seatDto.getSeatNos().stream()
                        .map(seatNo -> {
                            SeatWithTimeStamp seatWithTimeStamp = new SeatWithTimeStamp();
                            seatWithTimeStamp.setSeatNo(seatNo);
                            seatWithTimeStamp.setTimestamp(LocalDateTime.now());
                            return seatWithTimeStamp;
                        }).collect(Collectors.toList());
                newSeat.setSeats(seatsWithTimeStamp);
                seatDao.save(newSeat);
                return true;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    @Override
    public List<Integer> getAllSeatsForBus(Long busId) {
        List<Seat> seats = seatDao.findSeatByBusId(busId);
        return seats.stream()
                .flatMap(seat -> seat.getSeats().stream())
                .map(SeatWithTimeStamp::getSeatNo)
                .collect(Collectors.toList());
    }

    @Override
    public boolean unlockSeat(SeatDto seatDto) {
        try {
            Seat seat = seatDao.findByBusId(seatDto.getBusId());
            if (seat != null) {
                List<Integer> seatNosToRemove = seatDto.getSeatNos();
                
                // Remove the SeatWithTimeStamp entities from the collection
                Iterator<SeatWithTimeStamp> iterator = seat.getSeats().iterator();
                while (iterator.hasNext()) {
                    SeatWithTimeStamp seatWithTimeStamp = iterator.next();
                    if (seatNosToRemove.contains(seatWithTimeStamp.getSeatNo())) {
                        iterator.remove();
                    }
                }

                seatDao.save(seat);
                return true;
            } else {
                return false; // No seat entry found for the provided busId
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Handle exceptions
        }
    }


   

    @Override
    @Scheduled(fixedRate = 60000) // 300000 milliseconds = 5 minutes
    public void seatCleanup() {
    	System.out.println("////////////////////In SEat Cleanup/////////////////////");
        try {
            LocalDateTime currentTime = LocalDateTime.now();
            List<Seat> seats = seatDao.findAll();
            for (Seat seat : seats) {
                Iterator<SeatWithTimeStamp> iterator = seat.getSeats().iterator();
                while (iterator.hasNext()) {
                    SeatWithTimeStamp seatWithTimeStamp = iterator.next();
                    if (seatWithTimeStamp.getTimestamp().isBefore(currentTime.minusMinutes(1))) {
                        iterator.remove(); // Remove the stale SeatWithTimeStamp
                    }
                }
                seatDao.save(seat); // Save the Seat entity to persist the changes
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
