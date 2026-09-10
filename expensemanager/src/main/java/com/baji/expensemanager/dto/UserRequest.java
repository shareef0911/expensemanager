package com.baji.expensemanager.dto;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
public record UserRequest(@NotBlank(message="Name is Required") String name,
		@NotBlank(message="Email is Required")
		@Email(message="Invalid Email Format") String email) {

}
