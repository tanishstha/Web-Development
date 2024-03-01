package com.example.stepelegance.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {
    private Integer addressId;
    @NotNull
    private String addressName;
    @NotNull
    private String street;
    @NotNull
    private String city;
    @NotNull
    private String country;

}
