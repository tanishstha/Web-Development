package com.example.stepelegance.dto;

import com.example.stepelegance.Entity.UserDefinedDataEnums.TransactionStatus;
import lombok.Data;

@Data
public class OrderDTO {
    private Integer id;
    private String customerName;
    private String product;
    private Integer quantity;
    private String Address;
    private float amount;
    private TransactionStatus status;
}
