package com.example.stepelegance.controller;

import com.example.stepelegance.controller.Authentication.OtpEmailSender;
import com.example.stepelegance.Entity.User;
import com.example.stepelegance.controller.Authentication.PasswordEncoderUtil;
import com.example.stepelegance.dto.UserDTO;
import com.example.stepelegance.dto.UserForgetPasswordDTO;
import com.example.stepelegance.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins ="http://localhost:5173/" )
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final OtpEmailSender otpSender = new OtpEmailSender();
    private final boolean[] emailOtpPassword={false, false, false};

    @PostMapping("/save")
    public String createData(@RequestBody UserDTO userDTO){
        System.out.println(userDTO);
        userService.save(userDTO);
        return "new user created data";
    }

    @GetMapping("/getAll")
    public List<User> getAllData(){
        return userService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<User> getById(@PathVariable("id") Integer userId){
        return userService.getById(userId);
    }

    @GetMapping("/getByEmail/{email}")
    public Optional<User> getByEmail(@PathVariable("email") String userEmail){
        return userService.getByEmail(userEmail);
    }

    @DeleteMapping("/deleteById/{user_id}")
    public String deleteById(@PathVariable("user_id") Integer userId){
        userService.deleteById(userId);
        return "user deleted";
    }

    @PostMapping("/login")
    public Optional<String> userLogIn(@RequestBody UserDTO userDTO){
        if (userService.getByEmail(userDTO.getEmail()).isPresent()){
            Optional<User> user =this.getByEmail(userDTO.getEmail());
            if (user.isPresent()) {
                if (Objects.equals(PasswordEncoderUtil.getInstance().encode(userDTO.getPassword()), user.get().getPassword())) {
                    return Optional.of("authorized");
                }
            }else{
                return Optional.of("email not found");
            }
        }else{
            return Optional.of("email not found");
        }
        return Optional.empty();
    }

    @PostMapping("/sendotp")
    public boolean sendOTP(@RequestBody UserForgetPasswordDTO newUserDTO){
        // check if user exists in database

        final String userOTP = otpSender.otp;

        if (this.getByEmail(newUserDTO.getEmail()).isPresent()){// Email present in the database
            if (newUserDTO.getOtp().isBlank() && !emailOtpPassword[1]){// otp is blank so send through email.

                System.out.println(otpSender.otp);
                otpSender.sendOtpEmail(newUserDTO.getEmail());
                emailOtpPassword[1]=true;
                return true;
            }
            else{// otp is given
                if (!newUserDTO.getOtp().equals(userOTP)){// otp doesnt match
                    return false;
                }else{// otp matches
                    if (newUserDTO.getPassword().isBlank() && !emailOtpPassword[2]) {// password is not given
                        emailOtpPassword[2]=true;
                        return true;
                    }
                    else if (!newUserDTO.getPassword().isBlank()){// password is given so sets new password.
                        User user = this.getByEmail(newUserDTO.getEmail()).get();
                        UserDTO userDTO = getUserDTO(newUserDTO, user);

                        userService.save(userDTO);
                        emailOtpPassword[2]=true;
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            }

        }else {
            return false;
        }

    }

    private static UserDTO getUserDTO(UserForgetPasswordDTO newUserDTO, User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setGender(user.getGender());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(newUserDTO.getPassword());
        userDTO.setPhone(user.getPhone());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setRole(user.getRole());
        userDTO.setToken(user.getToken());
        return userDTO;
    }


}
