package com.app.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PasswordResetToken {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
 @JoinColumn(nullable = false, name = "user_id")
 private User user;

 private String token;

 private Date expiryDate;
 
 public boolean isExpired() {
     return expiryDate != null && expiryDate.before(new Date());
 }

 
}
