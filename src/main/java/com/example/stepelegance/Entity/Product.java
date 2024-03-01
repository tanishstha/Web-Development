package com.example.stepelegance.Entity;

import com.example.stepelegance.Entity.UserDefinedDataEnums.ProductCategory;
import com.example.stepelegance.Entity.UserDefinedDataEnums.ProductType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="product")
public class Product {

    @Id
    @SequenceGenerator(name = "product_seq_gen", sequenceName = "product_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "product_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer productId;

    @Column(name="product_name", nullable = false)
    private String productName;

    @Column(name = "product_image")
    private String productImage;

    @Column(name="description", nullable = false)
    private String description;

    @Column(name="price", nullable = false)
    private float price;

    @Column(name="quantity", nullable = false)
    private int quantity;

    @Column(name="size", nullable = false)
    private int size;

    @Enumerated(EnumType.STRING)
    @Column(name="type", nullable = false)
    private ProductType type;

    @Enumerated(EnumType.STRING)
    @Column(name="category", nullable = false)
    private ProductCategory category;

}
