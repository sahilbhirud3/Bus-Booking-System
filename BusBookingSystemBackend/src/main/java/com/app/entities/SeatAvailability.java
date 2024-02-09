package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class SeatAvailability extends Base {
	@ManyToOne
    @JoinColumn(name = "bus_details_id")
    private BusDetails busDetails;
   private LocalDate date;
   private int available_seats; 

	
	
}
