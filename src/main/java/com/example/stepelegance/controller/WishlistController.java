package com.example.stepelegance.controller;

import com.example.stepelegance.Entity.Wishlist;
import com.example.stepelegance.dto.WishlistDTO;
import com.example.stepelegance.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/save")
    public String createData(@RequestBody WishlistDTO wishlistDTO) {
    /*
    Should be in the format
    {
    // "wishlistId":"18",
    "user": {
        "userId":"18",
        "role": "USER",
        "firstName": "Allan",
        "lastName": "Gautam",
        "phone": "1234567890",
        "email": "allan@example.com",
        "password": "password123",
        "gender": "MALE",
        "dateOfBirth": "2003-01-01",
        "token": "token231"
    },
    "products": [
        {
            "productId": 1,
            "productName": "air force",
            "description": "Shine in satin, stay classic in canvas or get luxe with leather. No matter what you choose, these AF1s are all about you. 12 color choices and an additional gum rubber option for the sole mean your design is destined to be one of a kind—just like you.",
            "price": 135.0,
            "quantity": 10,
            "size": 10,
            "type": "SHOE",
            "category": "MEN",
            "wishlists": []
        }
    ]


}
     */
        System.out.println("WishList create data");
        System.out.println(wishlistDTO);

        wishlistService.save(wishlistDTO);
        return "new wishlist created";
    }

    @GetMapping("/getAll")
    public List<Wishlist> getAllData() {
        return wishlistService.getAll();

    }

    @GetMapping("/getByUid/{uid}")
    public List<Wishlist> getByUid(@PathVariable("uid") Integer uid) {
        return wishlistService.getByUserId(uid);

    }

    @GetMapping("/getById/{id}")
    public Optional<Wishlist> getById(@PathVariable("id") Integer wishlistId) {
        return wishlistService.getById(wishlistId);
    }


    @DeleteMapping("/deleteById/{wishlist_id}")
    public String deleteById(@PathVariable("wishlist_id") Integer wishlistId) {
        wishlistService.deleteById(wishlistId);
        return "wishlist deleted";
    }

}
