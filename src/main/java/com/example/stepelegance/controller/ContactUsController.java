package com.example.stepelegance.controller;

import com.example.stepelegance.Entity.ContactUS;
import com.example.stepelegance.dto.ContactUsDTO;
import com.example.stepelegance.service.ContactUsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins ="http://localhost:5173/" )
@RestController
@RequestMapping("/contact-us")
@RequiredArgsConstructor
public class ContactUsController {
    private final ContactUsService contactUsService;

    @PostMapping("/save")
    public String createData(@RequestBody ContactUsDTO contactUsDTO){
        contactUsService.save(contactUsDTO);
        return "success";
    }

    @GetMapping("/getAll")
    public List<ContactUS> getAllData(){
        return contactUsService.getAll();
    }

}
