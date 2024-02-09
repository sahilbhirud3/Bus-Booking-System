package com.app.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "password") // toString excluding password
public class User extends Base {
	@Column(length = 20)
	private String firstName;
	@Column(length = 20)
	private String lastName;
	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private UserRole role;
	
	@Column(unique = true) 
	private String mobile;
	
	@Column(length = 30,unique = true) 
	@Email(message = "Please provide a valid email address")
	private String email;
	private int age;
	private String gender;
	@Column(length = 300, nullable = false)
	private String password;
	
	
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Passenger> passengers;
	
	@OneToMany(mappedBy="user",cascade=CascadeType.ALL,orphanRemoval=true,fetch = FetchType.EAGER)
	private List<Bookings> bookings;
	
	
	//adding passenger in user account
	public void addPassenger(Passenger p) {
		passengers.add(p); //parent to child reln
		p.setUser(this);//child to parent reln
	}
	
	
	//removing passenger from user account
	public void removePassenger(Passenger p) {
		passengers.remove(p);
		p.setUser(null);
	}
	
	//adding Booking in user account
		public void addBooking(Bookings p) {
			bookings.add(p); //parent to child reln
			p.setUser(this);//child to parent reln
		}
		
		
		//removing Booking from user account
		public void removeBooking(Bookings p) {
			bookings.remove(p);
			p.setUser(null);
		}
	
}
