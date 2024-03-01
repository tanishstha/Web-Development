package com.example.stepelegance.service.impl;

import com.example.stepelegance.Entity.Cart;
import com.example.stepelegance.Entity.Transaction;
import com.example.stepelegance.Entity.User;
import com.example.stepelegance.dto.TransactionDTO;
import com.example.stepelegance.repository.AddressRepository;
import com.example.stepelegance.repository.CartRepository;
import com.example.stepelegance.repository.TransactionRepository;
import com.example.stepelegance.repository.UserRepository;
import com.example.stepelegance.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final AddressRepository addressRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public String save(TransactionDTO transactionDTO) {
        Transaction transaction = new Transaction();

        if (transactionDTO.getTransactionId()!=null){
            transaction = transactionRepository.findById(transactionDTO.getTransactionId())
                    .orElseThrow(()-> new NullPointerException("Transaction id cannot be found"));
        }

        transaction.setTransactionStatus(transactionDTO.getStatus());

        if (transactionDTO.getAddress()!=null){
            transaction.setAddress(transactionDTO.getAddress());
        }else if (transactionDTO.getAddressId()!=null){
            transaction.setAddress(addressRepository.findById(transactionDTO.getAddressId()).orElseThrow(()-> new NullPointerException("AddressId cannot be found.")));
        }else{
            return "Address is not given.";
        }

        if (transactionDTO.getCart()!=null){
            transaction.setCart(transactionDTO.getCart());
        } else if (transactionDTO.getCartId()!=null) {
            transaction.setCart(cartRepository.findById(transactionDTO.getCartId()).orElseThrow(()->new NullPointerException("Cart id cannot be found.")));
        } else if (transactionDTO.getUserEmail()!=null) {
            transaction.setCart(getByUserEmail(transactionDTO.getUserEmail()));
        } else{
            return "Cart is not given.";
        }

        transaction.setDiscount(transactionDTO.getDiscount());
        transaction.setTotal(transactionDTO.getTotal());

        transactionRepository.save(transaction);
        return "transaction saved successfully";
    }

    @Override
    public List<Transaction> getAll() {
        return transactionRepository.findAll();
    }

    @Override
    public Optional<Transaction> getById(Integer transactionId) {
        return transactionRepository.findById(transactionId);
    }

    @Override
    public Optional<TransactionDTO> getOrderDetailsById(Integer transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId).orElseThrow(()-> new NullPointerException("Transaction cannot be found"));
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setTransactionId(transaction.getTransactionId());

        return Optional.empty();

    }

    @Override
    public Cart getByUserEmail(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(()->new NullPointerException("User Email cannot be found."));
        return cartRepository.findByUser(user).orElseThrow(()->new NullPointerException("Cart of user cannot be found."));
    }

    @Override
    public void deleteById(Integer transactionId) {
        transactionRepository.deleteById(transactionId);
    }
}
