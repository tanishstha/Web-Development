package com.example.stepelegance.repository;

import com.example.stepelegance.Entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {


    @Query(value = "Select * from wishlist where user_id=?1", nativeQuery = true)
    List<Wishlist> findByUserId(Integer user_id);
}
