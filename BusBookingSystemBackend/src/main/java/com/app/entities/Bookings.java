package com.app.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Bookings extends Base {

 
    private LocalDateTime bookingDateTime;

    @ManyToOne
    private User user; // User Relationship
    
    @ManyToOne
    private Bus bus; // Bus Relationship


    private double fare;
    
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SeatAllocation> seatList = new ArrayList<>();

    
    
    
    public void addSeat(SeatAllocation s) {
        seatList.add(s); // Parent to child
        s.setBooking(this); // Child to parent
    }

    public void removeSeat(SeatAllocation s) {
        seatList.remove(s);
        s.setBooking(null);
    }

    
}