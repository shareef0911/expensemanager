package com.baji.expensemanager.service;

import java.util.List;

import com.baji.expensemanager.dto.ExpenseRequest;
import com.baji.expensemanager.entity.Expense;

public interface ExpenseService {
	
	Expense createExpense(ExpenseRequest expense);
	
	List<Expense> getAllExpense();
	
	Expense getExpenseById(Long id);
	
	List<Expense> getExpensesByEvent(Long eventId);
	
	Expense updateExpense(Long id,ExpenseRequest request);
	
	void deleteExpense(Long id);


	
	

}
