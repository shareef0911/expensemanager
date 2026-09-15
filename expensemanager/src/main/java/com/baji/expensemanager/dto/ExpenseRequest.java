package com.baji.expensemanager.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonCreator;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
public record ExpenseRequest(
		@NotBlank(message="Description is Required") String description,
		@NotNull(message="Amount is Required")
		@Positive(message="Amount must be greater than zero")
		Double amount,
		@NotBlank(message="Category is Required")
		String category,
		@NotNull(message = "Expense date is required")
        LocalDate expenseDate,

        @NotNull(message = "Event ID is required")
        Long eventId,

        @NotNull(message = "User ID is required")
        Long userId
) {

}
