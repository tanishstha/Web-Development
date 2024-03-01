package com.example.stepelegance.service;

import com.example.stepelegance.dto.AuthenticateRequest;
import com.example.stepelegance.dto.AuthenticateResponse;

public interface AuthenticateService {
    AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest);
}
