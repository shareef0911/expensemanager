package com.baji.expensemanager.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baji.expensemanager.dto.ExpenseRequest;
import com.baji.expensemanager.entity.Event;
import com.baji.expensemanager.entity.Expense;
import com.baji.expensemanager.entity.User;
import com.baji.expensemanager.exceptions.ResourceNotFoundException;
import com.baji.expensemanager.repository.EventRepository;
import com.baji.expensemanager.repository.ExpenseRepository;
import com.baji.expensemanager.repository.UserRepository;
import com.baji.expensemanager.service.ExpenseService;

@Service
public class ExpenseServiceImpl implements ExpenseService{
	@Autowired
	private EventRepository eventRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private ExpenseRepository expenseRepo;
	@Override
	public Expense createExpense(ExpenseRequest expense) {
		Event event = eventRepo.findById(expense.eventId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Event with ID " +
                                expense.eventId() +
                                " not found"
                        )
                );
		User user = userRepo.findById(expense.userId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User with ID " +
                                expense.userId() +
                                " not found"
                        )
                );

        Expense expensee = new Expense();

        expensee.setDescription(expense.description());
        expensee.setAmount(expense.amount());
        expensee.setCategory(expense.category());
        expensee.setExpenseDate(expense.expenseDate());
        expensee.setEvent(event);
        expensee.setPaidBy(user);

        return expenseRepo.save(expensee);

	}

	@Override
	public List<Expense> getAllExpense() {
		return expenseRepo.findAll();
	}

	@Override
	public List<Expense> getExpensesByEvent(Long eventId) {
		 if (!eventRepo.existsById(eventId)) {

	            throw new ResourceNotFoundException(
	                    "Event with ID " +
	                    eventId +
	                    " not found"
	            );
	        }

	        return expenseRepo.findByEventId(eventId);


	}

	@Override
	public Expense updateExpense(Long id, ExpenseRequest request) {
		 Expense expense = getExpenseById(id);

	        Event event = eventRepo.findById(
	                request.eventId()
	        ).orElseThrow(() ->
	                new ResourceNotFoundException(
	                        "Event with ID " +
	                        request.eventId() +
	                        " not found"
	                )
	        );


	        User user = userRepo.findById(
	                request.userId()
	        ).orElseThrow(() ->
	                new ResourceNotFoundException(
	                        "User with ID " +
	                        request.userId() +
	                        " not found"
	                )
	        );


	        expense.setDescription(request.description());
	        expense.setAmount(request.amount());
	        expense.setCategory(request.category());
	        expense.setExpenseDate(request.expenseDate());
	        expense.setEvent(event);
	        expense.setPaidBy(user);

	        return expenseRepo.save(expense);

		
	}

	@Override
	public void deleteExpense(Long id) {
		Expense expense = getExpenseById(id);

        expenseRepo.delete(expense);

		
	}

	@Override
	public Expense getExpenseById(Long id) {
		 return expenseRepo.findById(id)
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "Expense with ID " +
	                                id +
	                                " not found"
	                        )
	                );

	}

}
