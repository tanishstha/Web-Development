package com.example.stepelegance.service;

import com.example.stepelegance.Entity.Product;
import com.example.stepelegance.Entity.UserDefinedDataEnums.ProductCategory;
import com.example.stepelegance.dto.ProductDTO;
import com.example.stepelegance.dto.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    String save(ProductDTO productDTO);
    String saveImagePath(ProductDTO productDTO);
    byte[] getImage(String imagePath);
    List<Product> getAll();
    Optional<Product> getById(Integer productId);
    void deleteById(Integer productId);

    List<Product> getByCategory(ProductCategory productCategory);
}

