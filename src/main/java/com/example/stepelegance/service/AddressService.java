package com.example.stepelegance.service;

import com.example.stepelegance.Entity.Address;
import com.example.stepelegance.dto.AddressDTO;

import java.util.List;
import java.util.Optional;

public interface AddressService {
    String save(AddressDTO addressDTO);
    List<Address> getAll();
    Optional<Address> getById(Integer addressId);

    String deleteById(Integer addressId);
}
