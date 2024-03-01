package com.example.stepelegance.repository;

import com.example.stepelegance.Entity.Cart;
import com.example.stepelegance.Entity.ContactUS;
import com.example.stepelegance.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    Optional<Cart> findByUser(User user);
}
