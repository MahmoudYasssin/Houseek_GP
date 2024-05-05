package com.fci.cu.houseek.controllers;


import com.fci.cu.houseek.config.UserAuthenticationProvider;
import com.fci.cu.houseek.dto.AppartmentDto;
import com.fci.cu.houseek.dto.CredentialsDto;
import com.fci.cu.houseek.dto.SignUpDto;
import com.fci.cu.houseek.dto.UserDto;
import com.fci.cu.houseek.models.*;
import com.fci.cu.houseek.services.FirebaseStorageService;
import com.fci.cu.houseek.services.impl.UserServiceImplementation;
import com.fci.cu.houseek.services.interfaces.ApartmentService;
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
    private final ApartmentService apartmentService;

    @PostMapping("/login")
    public UserDto login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userServiceImplementation.login(credentialsDto);
       // System.out.println(userDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getUserName()));
        return userDto;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
      //  user.setRole("USER");
        UserDto createdUser = userServiceImplementation.register(user);
        System.out.println(createdUser);
        createdUser.setRole("USER");
        createdUser.setToken(userAuthenticationProvider.createToken(user.getUserName()));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }



    @PostMapping("/edit")
    public ResponseEntity<?> edit(

            @RequestParam("image") MultipartFile image,
            @RequestParam("name") String name,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("id") long id,
            @RequestParam("password") String password
    )

    {

        User user=new User();

        user.setPassword(password);
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setId(id);



        try {

            try (InputStream fileInputStream = image.getInputStream())
            {
                String fileName = image.getOriginalFilename();
                String uploadedImageUrl = FirebaseStorageService.uploadImage(fileInputStream, fileName);
                user.setUserImage(uploadedImageUrl);
            }
            UserDto newUser=userServiceImplementation.editUserData(user);

            return ResponseEntity.created(URI.create("/users/" + newUser.getId())).body(newUser);

            }
        catch (IOException e)
        {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Update User");
        }
    }

    @GetMapping ("/userApartments")
    public List<AppartmentDto> userApartments(@RequestParam("userId") long userId)
    {
        return userServiceImplementation.userApartments(userId);
    }










}
