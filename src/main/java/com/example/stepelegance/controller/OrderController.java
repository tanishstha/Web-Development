package com.example.stepelegance.controller;

import com.example.stepelegance.Entity.Transaction;
import com.example.stepelegance.dto.OrderDTO;
import com.example.stepelegance.repository.CartRepository;
import com.example.stepelegance.repository.ProductRepository;
import com.example.stepelegance.repository.TransactionRepository;
import com.example.stepelegance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins ="http://localhost:5173/" )
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final TransactionRepository transactionRepository;
    private final CartRepository cartRepository;

//    public List<OrderDTO> getAll(){
//        List<OrderDTO> orderDTOS = new ArrayList<>();
//        List<Transaction> transaction = transactionRepository.findAll();
//        for (Transaction transaction1 : transaction){
////            orderDTOS.add(new OrderDTO().setId(transaction1.getTransactionId()));
//        }
//
//
//    }
}
