package com.example.stepelegance.service.impl;

import com.example.stepelegance.Entity.Cart;
import com.example.stepelegance.Entity.User;
import com.example.stepelegance.dto.CartDTO;
import com.example.stepelegance.repository.CartRepository;
import com.example.stepelegance.repository.ProductRepository;
import com.example.stepelegance.repository.UserRepository;
import com.example.stepelegance.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    @Override
    public String save(CartDTO cartDTO) {
        Cart cart= new Cart();
        if (cartDTO.getCartId()!=null){// for editing cart
            cart = cartRepository.findById(cartDTO.getCartId())
                    .orElseThrow(() -> new NullPointerException("cart id cannot be found to edit data"));
        }
        if (cartDTO.getUser()!=null){
            cart.setUser(cartDTO.getUser());
        }else if (cartDTO.getUserEmail()!=null){
            cart.setUser(userRepository.findByEmail(cartDTO.getUserEmail()).orElseThrow(()->new NullPointerException("User email cannot be found")));
        }else{
            return "User not given";
        }
        if (cartDTO.getProduct()!=null){
            cart.setProduct(cartDTO.getProduct());
        }else if (cartDTO.getProductName()!=null){
            cart.setProduct(productRepository.findByProductName(cartDTO.getProductName()).orElseThrow(()->new NullPointerException("Product name cannot be found")));
        }else{
            return "product not given";
        }
        cart.setQuantity(cartDTO.getQuantity());
        cart.setDate(cartDTO.getDate());
        cart.setAmount(cartDTO.getAmount());

        cartRepository.save(cart);
        return "cart saved successfully";
    }

    @Override
    public List<Cart> getAll() {
        return cartRepository.findAll();
    }

    @Override
    public Optional<Cart> getById(Integer cartId) {
        return cartRepository.findById(cartId);
    }

    @Override
    public Optional<Cart> getByUserEmail(String userEmail) {// Work in progress

        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new NullPointerException("User Email cannot be found."));
        return cartRepository.findByUser(user);
    }

    @Override
    public void deleteById(Integer cartId) {
        cartRepository.deleteById(cartId);
    }
}
