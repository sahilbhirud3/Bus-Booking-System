package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddRouteDto;
import com.app.dto.GetRouteResp;
import com.app.entities.Routes;
import com.app.service.RouteService;

@RestController
@RequestMapping("/route")


public class RouteController {
	
	@Autowired
	private RouteService routeService;
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/addroute")
	public ResponseEntity<?> addRoute(@RequestBody AddRouteDto ard){
		
		return ResponseEntity.ok(routeService.addRoute(ard));
	}
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteroute/{routeid}")
	public ResponseEntity<?> deleteRoute(@PathVariable long routeid){
		
		return ResponseEntity.ok(routeService.deleteRoute(routeid));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/updateroute/{routeid}")
    public ResponseEntity<?> updateRoute(@PathVariable long routeid, @RequestBody AddRouteDto ard){
        return ResponseEntity.ok(routeService.updateRoute(routeid, ard));
    }
	
	@GetMapping("/allroutes")
	public List<GetRouteResp> getAllRoute()
	{
		List<GetRouteResp> r=routeService.getRoutes();
		return r;
	}

}