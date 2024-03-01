package com.example.stepelegance.controller;

import com.example.stepelegance.Entity.Cart;
import com.example.stepelegance.Entity.Product;
import com.example.stepelegance.Entity.User;
import com.example.stepelegance.Entity.UserDefinedDataEnums.ProductCategory;
import com.example.stepelegance.controller.Authentication.OtpEmailSender;
import com.example.stepelegance.dto.CartDTO;
import com.example.stepelegance.dto.ProductDTO;
import com.example.stepelegance.dto.UserDTO;
import com.example.stepelegance.dto.UserForgetPasswordDTO;
import com.example.stepelegance.service.CartService;
import com.example.stepelegance.service.ProductService;
import com.example.stepelegance.service.TransactionService;
import com.example.stepelegance.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final ProductService productService;
    private final UserService userService;
    private final CartService cartService;
    private final TransactionService transactionService;

    private final OtpEmailSender otpSender = new OtpEmailSender();
    private final boolean[] emailOtpPassword={false, false, false};

    @PostMapping("/product/save")
    public String createData(@ModelAttribute ProductDTO productDTO){
        System.out.println(productDTO);
        return productService.save(productDTO);
    }

    @PostMapping("/product/save-image")
    public String saveImage(@ModelAttribute ProductDTO productDTO){
        return productService.saveImagePath(productDTO);

    }

    @GetMapping("/product/getAll")
    public List<Product> getAllData(){
        return productService.getAll();

    }

    @GetMapping("/product/getById/{id}")
    public Optional<Product> getById(@PathVariable("id") Integer id){
        return productService.getById(id);
    }

    @GetMapping("/product/getImageByName/{ProductName}")
    public ResponseEntity<?> getImageByName(@PathVariable("ProductName") String productName) {
        byte[] image = productService.getImage(productName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);

    }

    @DeleteMapping("/product/deleteById/{id}")
    public String deleteById(@PathVariable("id") Integer productId){
        productService.deleteById(productId);
        return "product deleted.";
    }

    @GetMapping("/product/getByCategory/{Category}")
    public List<Product> getByCategory(@PathVariable("Category") ProductCategory productCategory){
        return productService.getByCategory(productCategory);
    }


// User
    @PostMapping("/user/save")
    public String createData(@RequestBody UserDTO userDTO){
        System.out.println(userDTO);
        userService.save(userDTO);
        return "new user created data";
    }

    @GetMapping("/user/getAll")
    public List<User> getAllUserData(){
        return userService.getAll();

    }

    @GetMapping("/user/getById/{id}")
    public Optional<User> getUserById(@PathVariable("id") Integer userId){
        return userService.getById(userId);
    }

    @GetMapping("/user/getByEmail/{email}")
    public Optional<User> getByEmail(@PathVariable("email") String userEmail){
        return userService.getByEmail(userEmail);
    }

    @DeleteMapping("/user/deleteById/{user_id}")
    public String deleteUserById(@PathVariable("user_id") Integer userId){
        userService.deleteById(userId);
        return "user deleted";
    }

    @PostMapping("/user/login")
    public Optional<String> userLogIn(@RequestBody UserDTO userDTO){
        if (userService.getByEmail(userDTO.getEmail()).isPresent()){
            Optional<User> user =this.getByEmail(userDTO.getEmail());
            if (user.isPresent()) {
                if (Objects.equals(userDTO.getPassword(), user.get().getPassword())) {
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

    @PostMapping("/user/sendotp")
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


    // Cart

    @PostMapping("/cart/save")
    public String createCartData(@RequestBody CartDTO cartDTO){
        System.out.println(cartDTO);
        return cartService.save(cartDTO);
    }

    @GetMapping("/cart/getAll")
    public List<Cart> getAllCartData(){
        return cartService.getAll();

    }

    @GetMapping("/cart/getCartById/{id}")
    public Optional<Cart> getCartById(@PathVariable("id") Integer id){
        return cartService.getById(id);
    }

    @DeleteMapping("/cart/deleteById/{id}")
    public String deleteCartById(@PathVariable("id") Integer cartId) {
        cartService.deleteById(cartId);
        return "cart deleted.";
    }



}
