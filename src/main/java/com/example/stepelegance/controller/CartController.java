package com.example.stepelegance.controller;

import com.example.stepelegance.Entity.Cart;
import com.example.stepelegance.dto.CartDTO;
import com.example.stepelegance.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins ="http://localhost:5173/")
@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("/save")
    public String createData(@RequestBody CartDTO cartDTO){
        System.out.println(cartDTO);
        return cartService.save(cartDTO);
    }

    @GetMapping("/getAll")
    public List<Cart> getAllData(){
        return cartService.getAll();

    }

    @GetMapping("/getById/{id}")
    public Optional<Cart> getById(@PathVariable("id") Integer id){
        return cartService.getById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteById(@PathVariable("id") Integer cartId) {
        cartService.deleteById(cartId);
        return "cart deleted.";
    }
}
