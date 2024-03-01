package com.example.stepelegance.dto;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserForgetPasswordDTO {
    @NotNull
    private String email;

    private String otp;

    private String password;
}
