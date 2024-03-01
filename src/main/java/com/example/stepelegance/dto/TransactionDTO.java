package com.example.stepelegance.dto;

import com.example.stepelegance.Entity.Address;
import com.example.stepelegance.Entity.Cart;
import com.example.stepelegance.Entity.UserDefinedDataEnums.TransactionStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private Integer transactionId;

    private TransactionStatus status;

    private Address address;
    private Integer addressId;

    private Cart cart;
    private Integer cartId;
    private String userEmail;

    @NotNull
    private float discount;
    @NotNull
    private float total;

}
