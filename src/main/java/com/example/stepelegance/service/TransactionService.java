package com.example.stepelegance.service;

import com.example.stepelegance.Entity.Cart;
import com.example.stepelegance.Entity.Transaction;
import com.example.stepelegance.dto.TransactionDTO;

import java.util.List;
import java.util.Optional;

public interface TransactionService {
    String save(TransactionDTO transactionDTO);
    List<Transaction> getAll();
    Optional<Transaction> getById(Integer transactionId);

    Optional<TransactionDTO> getOrderDetailsById(Integer transactionId);

    Cart getByUserEmail(String userEmail);
    void deleteById(Integer transactionId);

}
