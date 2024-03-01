package com.example.stepelegance.repository;

import com.example.stepelegance.Entity.ContactUS;
import com.example.stepelegance.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContactUsRepository extends JpaRepository<ContactUS, Integer> {
}
