package com.example.stepelegance.controller;

import com.example.stepelegance.Entity.Product;
import com.example.stepelegance.Entity.UserDefinedDataEnums.ProductCategory;
import com.example.stepelegance.dto.ProductDTO;
import com.example.stepelegance.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins ="http://localhost:5173/")
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping("/save")
    public String createData(@ModelAttribute ProductDTO productDTO){
        System.out.println(productDTO);
        return productService.save(productDTO);
    }

    @PostMapping("/save-image")
    public String saveImage(@ModelAttribute ProductDTO productDTO){
        return productService.saveImagePath(productDTO);

    }

    @GetMapping("/getAll")
    public List<Product> getAllData(){
        return productService.getAll();

    }

    @GetMapping("/getById/{id}")
    public Optional<Product> getById(@PathVariable("id") Integer id){
        return productService.getById(id);
    }

    @GetMapping("/getImageByName/{ProductName}")
    public ResponseEntity<?> getImageByName(@PathVariable("ProductName") String productName) {
        byte[] image = productService.getImage(productName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);

    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteById(@PathVariable("id") Integer productId){
        productService.deleteById(productId);
        return "product deleted.";
    }

    @GetMapping("/getByCategory/{Category}")
    public List<Product> getByCategory(@PathVariable("Category")ProductCategory productCategory){
        return productService.getByCategory(productCategory);
    }

}
