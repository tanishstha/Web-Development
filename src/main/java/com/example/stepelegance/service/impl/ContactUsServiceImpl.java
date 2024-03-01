package com.example.stepelegance.service.impl;

import com.example.stepelegance.Entity.ContactUS;
import com.example.stepelegance.dto.ContactUsDTO;
import com.example.stepelegance.repository.ContactUsRepository;
import com.example.stepelegance.service.ContactUsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContactUsServiceImpl implements ContactUsService {
    private final ContactUsRepository contactUsRepository;
    @Override
    public String save(ContactUsDTO contactUsDTO) {
        ContactUS contactUS = new ContactUS();

        if(contactUsDTO.getContactUsId()!=null){
            contactUS=contactUsRepository.findById(contactUsDTO.getContactUsId())
                    .orElseThrow(()-> new NullPointerException("contact us id cannot be found"));

        }
        contactUS.setFullName(contactUsDTO.getFullName());
        contactUS.setEmail(contactUsDTO.getEmail());
        contactUS.setSubject(contactUsDTO.getSubject());
        contactUS.setMessage(contactUsDTO.getMessage());
        contactUsRepository.save(contactUS);
        return "Forum submitted successfully";
    }

    @Override
    public List<ContactUS> getAll() {
        return null;
    }

    @Override
    public Optional<ContactUS> getById(Integer contactUsId) {
        return Optional.empty();
    }

    @Override
    public boolean deleteById(Integer contactUsId) {
        return false;
    }
}
