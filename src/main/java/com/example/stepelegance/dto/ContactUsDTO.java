package com.example.stepelegance.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactUsDTO {
    private Integer contactUsId;
    @NotNull
    private String fullName;
    @NotNull
    private String email;
    @NotNull
    private String subject;
    @NotNull
    private String message;

}
