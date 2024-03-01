package com.example.stepelegance.Entity;

import com.example.stepelegance.Entity.UserDefinedDataEnums.TransactionStatus;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="transaction")
public class Transaction {

    @Id
    @SequenceGenerator(name = "transaction_seq_gen", sequenceName = "transaction_id_seq", allocationSize = 1, initialValue = 1400)
    @GeneratedValue(generator = "transaction_seq_gen", strategy = GenerationType.IDENTITY)
    private Integer transactionId;

    @OneToOne()
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_status", nullable = false)
    private TransactionStatus transactionStatus;

    @Column(name = "discount", nullable = false)
    private float discount;

    @Column(name = "total", nullable = false)
    private float total;
}
