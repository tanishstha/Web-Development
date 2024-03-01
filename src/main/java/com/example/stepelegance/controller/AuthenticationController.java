package com.example.stepelegance.controller;

import com.example.stepelegance.dto.AuthenticateRequest;
import com.example.stepelegance.dto.AuthenticateResponse;
import com.example.stepelegance.service.AuthenticateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins ="http://localhost:5173/" )
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticateService authenticateService;

    @PostMapping("/authenticate")
    public AuthenticateResponse authenticate(@RequestBody AuthenticateRequest authenticateRequest){
        return authenticateService.authenticate(authenticateRequest);
    }
}
