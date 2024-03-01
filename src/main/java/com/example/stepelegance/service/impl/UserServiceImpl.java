package com.example.stepelegance.service.impl;

import com.example.stepelegance.Entity.User;
import com.example.stepelegance.controller.Authentication.PasswordEncoderUtil;
import com.example.stepelegance.dto.UserDTO;
import com.example.stepelegance.repository.UserRepository;
import com.example.stepelegance.service.UserService;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public String save(UserDTO userDTO) {
        User user = new User();

        String newGeneratedToken = null;
        if (userDTO.getUserId() != null) {// For existing users
            user = userRepository.findById(userDTO.getUserId())
                    .orElseThrow(() -> new NullPointerException("user data not found"));
            newGeneratedToken=user.getToken();
        } else {// For new users
            newGeneratedToken = String.valueOf(UUID.randomUUID());

        }

        user.setRole(userDTO.getRole());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhone(userDTO.getPhone());
        user.setEmail(userDTO.getEmail());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(userDTO.getPassword()));
        user.setGender(userDTO.getGender());
        user.setDateOfBirth(userDTO.getDateOfBirth());
        user.setToken((String) newGeneratedToken);

        userRepository.save(user); // for both creating and updating(if id is passed)

        return "new user created";
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll(); // select * from users;
    }

    @Override
    public Optional<User> getById(Integer userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<User> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void deleteById(Integer userId) {
        userRepository.deleteById(userId);
    }

}
