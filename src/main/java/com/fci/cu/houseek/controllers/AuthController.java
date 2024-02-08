package com.fci.cu.houseek.controllers;


import com.fci.cu.houseek.config.UserAuthenticationProvider;
import com.fci.cu.houseek.dto.CredentialsDto;
import com.fci.cu.houseek.dto.SignUpDto;
import com.fci.cu.houseek.dto.UserDto;
import com.fci.cu.houseek.models.Apartment;
import com.fci.cu.houseek.models.ApartmentImages;
import com.fci.cu.houseek.models.ProofOfApartmentOwnership;
import com.fci.cu.houseek.models.User;
import com.fci.cu.houseek.services.FirebaseStorageService;
import com.fci.cu.houseek.services.impl.UserServiceImplementation;
import com.fci.cu.houseek.services.interfaces.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserServiceImplementation userServiceImplementation;
    private final UserAuthenticationProvider userAuthenticationProvider;
    //private final UserService

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userServiceImplementation.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getUserName()));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userServiceImplementation.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(user.getUserName()));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

 /*  @PostMapping   ("/print")
    public String print( @RequestParam("description") String description,
                         @RequestParam("location") String location) {

        return "Hi in backend"+description+location;
    }*/

  /*  @PostMapping("/edit")
    public ResponseEntity<?> editUser(
            @RequestParam("images") MultipartFile image,
            @RequestParam("name")String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("password") String password,
            @RequestParam("userName") String userName


    )

    {


        try {
            User newUser = buildUser(name,email,userName,password,phone,image);
            Apartment savedApartment = UserService.saveApartment(newUser);
            return ResponseEntity.ok(savedApartment);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving apartment");
        }
    }

    private User buildUser(
            String name, String email, String userName, String password,
            String phone,
            MultipartFile image) throws IOException {

        User newUser = new User();
        newUser.setName(name);
        newUser.setUserName(userName);
        newUser.setPhone(phone);
        newUser.setEmail(email);
        newUser.setPassword(password);


        try (InputStream fileInputStream = image.getInputStream()) {
            String fileName = image.getOriginalFilename();
            String uploadedImageUrl = FirebaseStorageService.uploadImage(fileInputStream, fileName);
            newUser.setUserImage(uploadedImageUrl);

    }

        return newUser;
    }*/


}
