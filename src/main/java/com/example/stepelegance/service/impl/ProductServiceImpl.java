package com.example.stepelegance.service.impl;

import com.example.stepelegance.Entity.Product;
import com.example.stepelegance.Entity.UserDefinedDataEnums.ProductCategory;
import com.example.stepelegance.Entity.UserDefinedDataEnums.ProductType;
import com.example.stepelegance.dto.ProductDTO;
import com.example.stepelegance.repository.ProductRepository;
import com.example.stepelegance.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final String imageFilePath = "http://localhost:8087/";
    @Override
    public String save(ProductDTO productDTO) {

        Product product = new Product();

        if (productDTO.getProductId()!=null){
            product=productRepository.findById(productDTO.getProductId())
                    .orElseThrow(()->new NullPointerException("product data not found"));
        }

        if (productDTO.getProductImage() != null) {
            MultipartFile multipartFile = productDTO.getProductImage();
            String filePath = imageFilePath+multipartFile.getOriginalFilename();
            try {
                multipartFile.transferTo(new File(filePath));
            }catch (Exception e){
                return e.toString();
            }   product.setProductImage(multipartFile.getOriginalFilename());

        }
        product.setProductName(productDTO.getProductName());
        product.setDescription(productDTO.getDescription());

        product.setPrice(productDTO.getPrice());
        product.setQuantity(productDTO.getQuantity());
        product.setSize(productDTO.getSize());
        product.setType(productDTO.getType());
        product.setCategory(productDTO.getCategory());

        productRepository.save(product);

        return "product successfully added";
    }

    @Override
    public String saveImagePath(ProductDTO productDTO)  {
        MultipartFile multipartFile = productDTO.getProductImage();
        String filePath = imageFilePath+multipartFile.getOriginalFilename();
        try {
            multipartFile.transferTo(new File(filePath));
        }catch (Exception e){
            return e.toString();
        }

        Product product = new Product();

        product.setProductName("ProductName");
        product.setProductImage(multipartFile.getOriginalFilename());
        product.setDescription("Description");

        product.setPrice(10);
        product.setQuantity(1);
        product.setSize(12);
        product.setType(ProductType.SHOE);
        product.setCategory(ProductCategory.MEN);

        productRepository.save(product);

        return "product Image saved successfully";
    }

    @Override
    public byte[] getImage(String productName) {
        Optional<Product> product = productRepository.findByProductName(productName);
         String filePath = imageFilePath+product.get().getProductImage();
        try {
            byte[] image = Files.readAllBytes(new File(filePath).toPath());
            return image;
        }
        catch (Exception e){
            System.out.println(e);
        }
        return null;
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getById(Integer productId) {
        Optional<Product> product =productRepository.findById(productId);

        return product;
    }

    @Override
    public void deleteById(Integer productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public List<Product> getByCategory(ProductCategory productCategory) {
        List<Product> products = productRepository.findAll();
        List<Product> products_copy = new ArrayList<>();
        for (Product product : products){
            if (product.getCategory().equals(productCategory)){
                products_copy.add(product);
            }
        }
        return products_copy;
    }


}
