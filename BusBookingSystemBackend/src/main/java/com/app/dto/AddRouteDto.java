package com.app.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddRouteDto {

	@NotNull(message = "Station ID from is required")
	private long stationIdFrom;

	@NotNull(message = "Station ID to is required")
	private long stationIdTo;

	@Min(value = 0, message = "Distance must be greater than or equal to 0")
	private int distance;

}
