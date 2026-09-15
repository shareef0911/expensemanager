package com.baji.expensemanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baji.expensemanager.dto.EventRequest;
import com.baji.expensemanager.entity.Event;
import com.baji.expensemanager.service.EventService;

@RestController
@RequestMapping("/api/events")
public class EventController {
	
	@Autowired
	private EventService eventService;
	
	@PostMapping
	ResponseEntity<Event> createEvent(@RequestBody EventRequest event) {
		return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(event));
	}
	
	@GetMapping
	ResponseEntity<List<Event>> getAllEvents(){
		return ResponseEntity.ok(eventService.getAllEvents());
	}
	
	@GetMapping("/{id}")
	ResponseEntity<Event> getEventById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(eventService.getEventById(id));
	}
	
	@PostMapping("/{eventId}/members/{userId}")
	ResponseEntity<Event> addMember(@PathVariable Long eventId,@PathVariable Long userId){
		return ResponseEntity.ok(eventService.addMember(eventId, userId));
	}
	
	@DeleteMapping("/{eventId}/members/{userId}")
	ResponseEntity<Event> removeMember(@PathVariable("id") Long eventId,@PathVariable("id") Long userId){
		return ResponseEntity.ok(eventService.removeMember(eventId, userId));
	}

}
