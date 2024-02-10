package com.app.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

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

    @Min(value = 1, message = "Bus number must be greater than 0")
    private int busNo;

    @Min(value = 1, message = "Total seats must be greater than 0")
    private int totalSeats;

    @NotNull(message = "Start time cannot be null")
    @FutureOrPresent(message = "Start time must be in the present or future")
    private LocalDateTime startTime;

    @NotNull(message = "End time cannot be null")
    @FutureOrPresent(message = "End time must be in the present or future")
    private LocalDateTime endTime;

    @ManyToOne
    private Routes route;

    
}