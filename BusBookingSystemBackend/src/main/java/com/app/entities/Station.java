package com.app.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

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
public class Station extends Base{
	private String stationName;

    @OneToMany(mappedBy = "stationIdBoarding",fetch = FetchType.EAGER)
    private List<Routes> boardingRoutes;

    @OneToMany(mappedBy = "stationIdDestination")
    private List<Routes> destinationRoutes;

}
