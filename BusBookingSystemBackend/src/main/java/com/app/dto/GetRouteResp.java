package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetRouteResp {
	
	Long id;
	double distance;
	String from;
	String to;
	long fromId;
	long toId;


}