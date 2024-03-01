package com.example.stepelegance.controller;

import com.example.stepelegance.Entity.Transaction;
import com.example.stepelegance.dto.TransactionDTO;
import com.example.stepelegance.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins ="http://localhost:5173/" )
@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
public class TransactionController {
    public final TransactionService transactionService;

    @PostMapping("/save")
    public String createData(@RequestBody TransactionDTO transactionDTO){
        System.out.println(transactionDTO);
        return transactionService.save(transactionDTO);
    }

    @GetMapping("/getAll")
    public List<Transaction> getAllData(){
        return transactionService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Transaction> getById(@PathVariable("id") Integer id){
        return transactionService.getById(id);
    }

    @GetMapping("/getOrderDetailsById/{id}")
    public Optional<TransactionDTO> getOrderDetailsById(@PathVariable("id") Integer id){
        return transactionService.getOrderDetailsById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteById(@PathVariable("id") Integer transactionId){
        transactionService.deleteById(transactionId);
        return "transaction deleted.";
    }
}
