package com.baji.expensemanager.dto;

import jakarta.validation.constraints.NotBlank;

public record EventRequest(
		@NotBlank(message="EventName is Required") String eventName,
		@NotBlank(message="Location is Required") String location
		) {

}
