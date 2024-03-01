package com.example.stepelegance.service;

import com.example.stepelegance.Entity.User;
import com.example.stepelegance.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    String save(UserDTO userDTO);
    List<User> getAll();
    Optional<User> getById(Integer userId);

    Optional<User> getByEmail(String email);
    void deleteById(Integer userId);
}
