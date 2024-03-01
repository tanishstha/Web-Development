package com.example.stepelegance.dto;

import com.example.stepelegance.Entity.Product;
import com.example.stepelegance.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WishlistDTO {
    private Integer wishlistId;
    private User user;
    private Product product;
    private List<Product> products;
    private String userEmail;
    private String productName;
}
