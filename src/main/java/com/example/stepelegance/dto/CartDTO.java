package com.example.stepelegance.dto;

import com.example.stepelegance.Entity.Product;
import com.example.stepelegance.Entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Integer cartId;

    private User user;
    private String userEmail;

    private Product product;
    private String productName;

    private Integer quantity;

    @NotNull
    private String date;

    @NotNull
    private float amount;

}
