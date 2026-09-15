package com.baji.expensemanager.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baji.expensemanager.dto.EventRequest;
import com.baji.expensemanager.entity.Event;
import com.baji.expensemanager.entity.User;
import com.baji.expensemanager.exceptions.ResourceNotFoundException;
import com.baji.expensemanager.repository.EventRepository;
import com.baji.expensemanager.repository.UserRepository;
import com.baji.expensemanager.service.EventService;
@Service
public class EventServiceImpl implements EventService{

	@Autowired
	private EventRepository eventRepository;
	
	@Autowired
	private UserRepository userRepository;
	@Override
	public Event createEvent(EventRequest request) {
		Event event = new Event();
		
		event.setEventName(request.eventName());
		event.setLocation(request.location());
		return eventRepository.save(event);
	}

	@Override
	public List<Event> getAllEvents() {
		return eventRepository.findAll();
	}

	@Override
	public Event getEventById(Long id) {
		
		return eventRepository.findById(id).orElseThrow(()->{
			throw new ResourceNotFoundException("Event Not Found : "+id);
		});
	}

	@Override
	public Event addMember(Long eventId, Long userId) {
		User user = userRepository.findById(userId).orElseThrow(()->{
		throw new ResourceNotFoundException("User with :"+userId+" Not Found!");
		});
		
		Event event = eventRepository.findById(eventId).orElseThrow(()->{
			throw new ResourceNotFoundException("Event Not Found : "+eventId);
		});
		event.getMembers().add(user);
		
		return eventRepository.save(event);
	}

	@Override
	public Event removeMember(Long eventId, Long userId) {
		Event event = getEventById(eventId);
        User user = userRepository.findById(userId).orElseThrow(() ->
                        new ResourceNotFoundException("User with ID " + userId + " not found")
                );
        event.getMembers().remove(user);

		return eventRepository.save(event);
	}

}
