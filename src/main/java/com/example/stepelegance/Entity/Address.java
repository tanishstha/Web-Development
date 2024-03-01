package com.example.stepelegance.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "address" )
public class Address {
    @Id
    @SequenceGenerator(name = "address_seq_gen", sequenceName = "address_id_seq", allocationSize = 1, initialValue = 1400)
    @GeneratedValue(generator = "address_seq_gen", strategy = GenerationType.IDENTITY)
    private Integer addressId;
    @Column(name = "address_name", nullable = false)
    private String addressName;
    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "country", nullable = false)
    private String country;
}
