package com.example.stepelegance.service.impl;

import com.example.stepelegance.Entity.Product;
import com.example.stepelegance.Entity.User;
import com.example.stepelegance.Entity.Wishlist;
import com.example.stepelegance.dto.WishlistDTO;
import com.example.stepelegance.repository.ProductRepository;
import com.example.stepelegance.repository.UserRepository;
import com.example.stepelegance.repository.WishlistRepository;
import com.example.stepelegance.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public String save(WishlistDTO wishlistDTO) {
        Wishlist wishlist = new Wishlist();


        if (wishlistDTO.getWishlistId()!=null){
            wishlist=wishlistRepository.findById(wishlistDTO.getWishlistId())
                    .orElseThrow(()->new NullPointerException("WishList not found"));
        }
        if (wishlistDTO.getUser()!=null){
            wishlist.setUser(wishlistDTO.getUser());
        } else if (wishlistDTO.getUserEmail()!=null) {
            User user = userRepository.findByEmail(wishlistDTO.getUserEmail()).orElseThrow(() -> new NullPointerException("User email cannot be found"));
            wishlist.setUser(user);
        }
        if (wishlistDTO.getProduct()!=null) {
            wishlist.setProduct(wishlistDTO.getProduct());
        } else if (wishlistDTO.getProductName()!=null) {
            Product product = productRepository.findByProductName(wishlistDTO.getProductName()).orElseThrow(() -> new NullPointerException("Product name cannot be found"));
            wishlist.setProduct(product);
        }
        wishlistRepository.save(wishlist);

        return "New WishList Created.";

    }

    @Override
    public List<Wishlist> getAll() {
        return wishlistRepository.findAll();

    }  @Override
    public List<Wishlist> getByUserId(Integer uid) {
        return wishlistRepository.findByUserId(uid);

    }

    @Override
    public Optional<Wishlist> getById(Integer wishlistId) {
        return wishlistRepository.findById(wishlistId);
    }

    @Override
    public void deleteById(Integer wishlistId) {
        wishlistRepository.deleteById(wishlistId);
    }
}
