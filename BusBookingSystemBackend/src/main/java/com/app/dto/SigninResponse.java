package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SigninResponse {
	private long id;
	private String jwt;
	private String mesg;
	public SigninResponse(String jwt, String mesg) {
		super();
		this.jwt = jwt;
		this.mesg = mesg;
	}

	
}
