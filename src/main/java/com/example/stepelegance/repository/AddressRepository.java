package com.example.stepelegance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.stepelegance.Entity.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}
