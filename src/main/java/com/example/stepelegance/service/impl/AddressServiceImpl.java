package com.example.stepelegance.service.impl;

import com.example.stepelegance.Entity.Address;
import com.example.stepelegance.dto.AddressDTO;
import com.example.stepelegance.repository.AddressRepository;
import com.example.stepelegance.service.AddressService;
import com.example.stepelegance.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    @Override
    public String save(AddressDTO addressDTO) {
        Address contactUS = new Address();

        if(addressDTO.getAddressId()!=null){
            contactUS=addressRepository.findById(addressDTO.getAddressId())
                    .orElseThrow(()-> new NullPointerException("contact us id cannot be found"));

        }
        contactUS.setAddressName(addressDTO.getAddressName());
        contactUS.setStreet(addressDTO.getStreet());
        contactUS.setCity(addressDTO.getCity());
        contactUS.setCountry(addressDTO.getCountry());
        addressRepository.save(contactUS);
        return "Forum submitted successfully";
    }

    @Override
    public List<Address> getAll() {
        return addressRepository.findAll();
    }

    @Override
    public Optional<Address> getById(Integer addressId) {
        return Optional.empty();
    }

    @Override
    public String deleteById(Integer addressId) {
        addressRepository.deleteById(addressId);
        return "deleted successfully";
    }
}
