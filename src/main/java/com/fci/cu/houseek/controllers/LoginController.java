/*
package com.fci.cu.houseek.controllers;


import com.fci.cu.houseek.constants.SecurityConstants;
import com.fci.cu.houseek.models.User;
import com.fci.cu.houseek.repositories.UserRepository;
import com.fci.cu.houseek.services.impl.CustomAuthenticationProvider;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthenticationProvider customAuthenticationProvider;


    @PostMapping("/signup")
    public ResponseEntity<User> saveCustomer(@RequestBody User user) {
        User user1=new User();
        user1=userRepository.findUserByUsername(user.getUserName());
        if(user1 ==null)
        {
            String hashPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashPassword);
            String token = customAuthenticationProvider.generateTokenForUser(user);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization",token);
            return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body(userRepository.save(user));
        }
        return null;


    }



    @GetMapping("/user")  ///--> login
    public String getUserDetailsAfterLogin(Authentication authentication) {
        String userName = authentication.getName();
        User user = userRepository.findUserByUsername(userName);
        return user.getUserName();
    }
}

 */