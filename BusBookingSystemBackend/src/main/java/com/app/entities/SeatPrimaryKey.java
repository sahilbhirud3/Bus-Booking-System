package com.app.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SeatPrimaryKey implements Serializable {
    
    @Column(name = "bus_id")
    private long busId;
    
    @Column(name = "seat_no")
    private int seatNo;
    
    
}
