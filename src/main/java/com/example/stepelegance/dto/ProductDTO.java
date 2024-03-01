package com.example.stepelegance.dto;

import com.example.stepelegance.Entity.UserDefinedDataEnums.ProductCategory;
import com.example.stepelegance.Entity.UserDefinedDataEnums.ProductType;
import com.example.stepelegance.Entity.Wishlist;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Integer productId;

    @NotNull
    private String productName;

    @Nullable
    private MultipartFile productImage;

    @NotNull
    private String description;

    @NotNull
    private float price;

    @NotNull
    private int quantity;

    @NotNull
    private int size;

    @NotNull
    private ProductType type;

    @NotNull
    private ProductCategory category;

    private List<Wishlist> wishlist;
}
