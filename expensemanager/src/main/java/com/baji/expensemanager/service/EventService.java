package com.baji.expensemanager.service;

import java.util.List;

import com.baji.expensemanager.dto.EventRequest;
import com.baji.expensemanager.entity.Event;

public interface EventService {
	Event createEvent(EventRequest request);
	List<Event> getAllEvents();
	Event getEventById(Long id);
	Event addMember(Long eventId,Long userId);
	Event removeMember(Long eventId,Long userId);



}
