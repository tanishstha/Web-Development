package com.example.stepelegance.service;

import com.example.stepelegance.Entity.Cart;
import com.example.stepelegance.dto.CartDTO;

import java.util.List;
import java.util.Optional;

public interface CartService {

    String save(CartDTO cartDTO);
    List<Cart> getAll();
    Optional<Cart> getById(Integer cartId);

    Optional<Cart> getByUserEmail(String cartEmail);

    void deleteById(Integer cartId);
}
