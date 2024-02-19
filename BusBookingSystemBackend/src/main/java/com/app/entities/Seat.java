package com.app.entities;

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
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Seat extends Base{

	@ManyToOne
	private Bus bus;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SeatWithTimeStamp> seats;
	
}