package com.baji.expensemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baji.expensemanager.entity.Event;

public interface EventRepository extends JpaRepository<Event,Long>{

}
