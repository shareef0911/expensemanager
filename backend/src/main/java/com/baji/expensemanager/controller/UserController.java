package com.baji.expensemanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baji.expensemanager.dto.UserRequest;
import com.baji.expensemanager.entity.User;
import com.baji.expensemanager.service.UserService;


@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/createUser")
	public User createUser(@RequestBody UserRequest user) {
		return userService.createUser(user);
	}
	
	@GetMapping("/getUsers")
	List<User> getUsers(){
		return userService.getAllUsers();
	}
	
	@GetMapping("/getUser/{id}")
	
	User getUser(@PathVariable("id") Long id) {
		return userService.getUserById(id);
	}
	@DeleteMapping("/deleteUser/{id}")
	void deleteUser(@PathVariable("id") Long id) {
		userService.deleteUser(id);
	}

}
