package com.baji.expensemanager.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleNotFound(
			ResourceNotFoundException ex,
            HttpServletRequest request){
		ErrorResponse response = new ErrorResponse(
				 LocalDateTime.now(),
	                HttpStatus.NOT_FOUND.value(),
	                "Not Found",
	                ex.getMessage(),
	                request.getRequestURI()
				);
		return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);

	}
	
	  @ExceptionHandler(BadRequestException.class)
	    public ResponseEntity<ErrorResponse> handleBadRequest(
	            BadRequestException ex,
	            HttpServletRequest request) {

	        ErrorResponse response = new ErrorResponse(
	                LocalDateTime.now(),
	                HttpStatus.BAD_REQUEST.value(),
	                "Bad Request",
	                ex.getMessage(),
	                request.getRequestURI()
	        );

	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body(response);
	    }

	
}
