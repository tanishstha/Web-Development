package com.example.stepelegance.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="contactus")
public class ContactUS {
    @Id
    @SequenceGenerator(name="contactus_seq_gen", sequenceName ="contactus_seq_gen", allocationSize = 1)
    @GeneratedValue(generator = "contactus_seq_gen", strategy = GenerationType.IDENTITY)
    private Integer contactUsId;

    @Column(name="full_name", nullable = false)
    private String fullName;

    @Email
    @Column(name="email", nullable = false)
    private String email;

    @Column(name = "subject",nullable = false)
    private String subject;

    @Column(name="message", nullable = false)
    private String message;
}
