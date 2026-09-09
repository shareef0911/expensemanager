package com.baji.expensemanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baji.expensemanager.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense,Long>{
	public abstract List<Expense> findByEventId(Long eventid);
}
