package com.fci.cu.houseek.controllers;

import com.fci.cu.houseek.dto.Notification;
import com.fci.cu.houseek.services.interfaces.ApartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    private final ApartmentService apartmentService;

    @PostMapping("/sendMessage")
    public void message(@RequestParam("message") String message, @RequestParam("apartmentId") long apartmentId)
    {
        apartmentService.userMessages(apartmentId,message);
    }

    @GetMapping("/showMessages")
    public List<Notification>showAllMessages(@RequestParam("userName")String userName)
    {
        return apartmentService.userAllMessages(userName);
    }

    @GetMapping("/showWhoAddMyApartmentToFavList")
    public List<Notification>showWhoAddToFavList(@RequestParam("userName")String userName)
    {
        return apartmentService.messageWhoAddToFavList(userName);
    }

    @GetMapping("/showWhoViewMyApartment")
    public List<Notification>showWhoSeeMyApartment(@RequestParam("userName")String userName)
    {
        return apartmentService.messageWhoViewApartment(userName);
    }


    @PostMapping("/editMessageStatus")
    public void editMessageStatus(@RequestParam("userName")String userName)
    {
         apartmentService.editMessageStatus(userName);
    }



}
