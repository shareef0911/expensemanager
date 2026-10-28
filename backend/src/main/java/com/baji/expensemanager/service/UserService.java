package com.baji.expensemanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.baji.expensemanager.dto.UserRequest;
import com.baji.expensemanager.entity.User;

@Service
public interface UserService {
	
	public abstract User createUser(UserRequest request);
	
	public abstract List<User> getAllUsers();
	
	public abstract User getUserById(Long id);
	
	public abstract void deleteUser(Long id);

}
