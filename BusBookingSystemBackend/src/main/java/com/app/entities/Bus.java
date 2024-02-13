	package com.app.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Bus extends Base {

	 @Column(unique = true)
	 @Pattern(regexp = "[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}", message = "Invalid vehicle number")
	    private String busNo;

    @Min(value = 1, message = "Total seats must be greater than 0")
    private int totalSeats;

    @NotNull(message = "Start Datetime cannot be null") 
    private LocalDateTime startTime;

    @NotNull(message = "End Datetime cannot be null")
    private LocalDateTime endTime;

    @ManyToOne
    private Routes route;

    
}