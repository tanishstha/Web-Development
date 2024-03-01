package com.example.stepelegance.repository;

import com.example.stepelegance.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
}
