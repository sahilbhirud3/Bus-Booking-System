package com.app.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
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
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Routes extends Base{

	@ManyToOne
//    @JoinColumn(name = "station_id_boarding")
    private Station stationIdBoarding;

    @ManyToOne
  //  @JoinColumn(name = "station_id_destination")
    private Station stationIdDestination;

    private double distance;
    
    @OneToMany(mappedBy = "route",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<BusDetails> buses;
    
    @OneToMany(mappedBy = "routes",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
    private List<Bookings> routes;
    
    public void addBus(BusDetails p) {
		buses.add(p); //parent to child reln
		p.setRoute(this);//child to parent reln
	}
	
	
	//removing Bus from 
	public void removeBus(BusDetails p) {
		buses.remove(p);
		p.setRoute(null);
	}
	
	public void addBooking(Bookings b) {
		routes.add(b); //parent to child reln
		b.setRoutes(this);//child to parent reln
	}
	
	
	
	public void removeBus(Bookings b) {
		routes.remove(b);
		b.setRoutes(null);
	}



	
	
}
