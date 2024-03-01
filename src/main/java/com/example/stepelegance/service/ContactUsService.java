package com.example.stepelegance.service;

import com.example.stepelegance.Entity.ContactUS;
import com.example.stepelegance.dto.ContactUsDTO;

import java.util.List;
import java.util.Optional;

public interface ContactUsService {
    String save(ContactUsDTO contactUsDTO);
    List<ContactUS> getAll();
    Optional<ContactUS> getById(Integer contactUsId);
    boolean deleteById(Integer contactUsId);
}
