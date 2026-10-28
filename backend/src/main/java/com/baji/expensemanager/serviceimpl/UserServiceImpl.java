package com.baji.expensemanager.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baji.expensemanager.dto.UserRequest;
import com.baji.expensemanager.entity.User;
import com.baji.expensemanager.exceptions.ResourceNotFoundException;
import com.baji.expensemanager.repository.UserRepository;
import com.baji.expensemanager.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	

	
	@Autowired
	private UserRepository userRepository;

	@Override
	public User createUser(UserRequest request) {
		
		if(userRepository.findByEmail(request.email()).isPresent()) {
			throw new ResourceNotFoundException("Already email Exist:"+request.email());
		}
		
		User user = new User();
		user.setEmail(request.email());
		user.setName(request.name());
		
		
		
		return userRepository.save(user);
	}

	@Override
	public List<User> getAllUsers() {
		
		return userRepository.findAll();
	}

	@Override
	public User getUserById(Long id) {
		
		return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                "User with ID " + id + " not found")
				);
	}

	@Override
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}

}
