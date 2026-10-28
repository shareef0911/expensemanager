package com.baji.expensemanager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baji.expensemanager.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
	public abstract  Optional<User> findByEmail(String email);

}
