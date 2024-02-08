package com.fci.cu.houseek.services.impl;

import com.fci.cu.houseek.dto.CredentialsDto;
import com.fci.cu.houseek.dto.SignUpDto;
import com.fci.cu.houseek.dto.UserDto;
import com.fci.cu.houseek.models.User;
//import com.fci.cu.houseek.models.UserImage;
import com.fci.cu.houseek.repositories.UserRepository;
import com.fci.cu.houseek.services.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import com.fci.cu.houseek.dto.CredentialsDto;
import com.fci.cu.houseek.dto.SignUpDto;
import com.fci.cu.houseek.dto.UserDto;
import com.fci.cu.houseek.models.User;
import com.fci.cu.houseek.exceptions.AppException;
import com.fci.cu.houseek.mappers.UserMapper;
import com.fci.cu.houseek.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;




@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {


    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findUserByUsername(credentialsDto.getUserName())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findUserByUsername(userDto.getUserName());

        if (optionalUser.isPresent()) {
            throw new AppException("User Name already exists", HttpStatus.CONFLICT);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(savedUser);
    }

    public UserDto findByLogin(String login) {
        User user = userRepository.findUserByUsername(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

   /* @Override
    public User editUserData(User user) {

        return userRepository.save(user);
    }*/


}
