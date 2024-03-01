package com.example.stepelegance.service;

import com.example.stepelegance.Entity.Wishlist;
import com.example.stepelegance.dto.WishlistDTO;

import java.util.List;
import java.util.Optional;

public interface WishlistService {

    String save(WishlistDTO wishlistDTO);

    List<Wishlist> getAll();

    Optional<Wishlist> getById(Integer wishlistId);

    void deleteById(Integer wishlistId);

    List<Wishlist> getByUserId(Integer uid);
}
