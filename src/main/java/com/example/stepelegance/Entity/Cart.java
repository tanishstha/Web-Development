package com.example.stepelegance.Entity;

import jakarta.persistence.*;
import lombok.*;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="cart")
public class Cart {
    @Id
    @SequenceGenerator(name="cart_seq_gen", sequenceName = "cart_id_sequence", allocationSize = 1)
    @GeneratedValue(generator = "cart_seq_gen", strategy = GenerationType.IDENTITY)
    private Integer cartId;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name="date", nullable = false)
    private String date;

    @Column(name = "amount", nullable = false)
    private float amount;

}
