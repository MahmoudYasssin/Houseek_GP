package com.fci.cu.houseek.services.impl;

import com.fci.cu.houseek.dto.*;
import com.fci.cu.houseek.models.User;
//import com.fci.cu.houseek.models.UserImage;
import com.fci.cu.houseek.repositories.ApartmentRepository;
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
import java.util.List;
import java.util.Optional;




@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {


    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ApartmentRepository apartmentRepository;


    private final UserMapper userMapper;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findUserByUsername(credentialsDto.getUserName())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

       // System.out.println(user);
        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            UserDto userDto= userMapper.toUserDto(user);
            userDto.setRole(user.getRole());
            userDto.setUserImage(user.getUserImage());
            System.out.println(userDto);
            return  userDto;


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
        user.setRole("USER");
        System.out.println(user);


        User savedUser = userRepository.save(user);


        return userMapper.toUserDto(savedUser);
    }

    public UserDto findByLogin(String login) {
        User user = userRepository.findUserByUsername(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

  /*  @Override
    public UserDto editUserData(UserDto userDto) {
        Optional<User> optionalUser = userRepository.findUserByUsername(userDto.getUserName());

        if (optionalUser.isPresent()) {
            throw new AppException("User Name already exists", HttpStatus.CONFLICT);
        }
        SignUpDto signUpDto=new SignUpDto();
        signUpDto.setUserName(userDto.getUserName());
        signUpDto.setPassword(userDto);
        signUpDto.setName();
        signUpDto.setPassword();
        signUpDto.setEmail();
        signUpDto.setPhone();

        User user = userMapper.signUpToUser(userDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(savedUser);
    }*/

    @Override
    public UserDto editUserData(User user) {

        Optional<User> optionalUser = userRepository.findUserByUsername(user.getUserName());

        if (optionalUser.isPresent()) {
            throw new AppException("User Name already exists", HttpStatus.CONFLICT);
        }
        User user1=userRepository.findUserById(user.getId());

        //to encrypt
        SignUpDto signUpDto=new SignUpDto();
        signUpDto.setUserName(user1.getUserName());
        signUpDto.setName(user.getName());
        signUpDto.setPassword(user.getPassword());
        signUpDto.setEmail(user.getEmail());
        signUpDto.setPhone(user.getPhone());

        User user2 = userMapper.signUpToUser(signUpDto);
        user2.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.getPassword())));
        user2.setUserImage(user.getUserImage());
        user2.setId(user.getId());




        user1.setUserImage(user2.getUserImage());
        user1.setPassword(user2.getPassword());
        user1.setEmail(user2.getEmail());
        user1.setPhone(user2.getPhone());
        user1.setName(user2.getName());
        user1.setId(user2.getId());

        //   userName   id

        UserDto userDto=new UserDto();

        userDto.setUserName(user1.getUserName());
        userDto.setName(user1.getName());
        userDto.setPhone(user1.getPhone());
        userDto.setUserImage(user1.getUserImage());
        userDto.setEmail(user1.getEmail());
        userDto.setId(user1.getId());
        userDto.setUserName(user1.getUserName());

        System.out.println(userDto);





         userRepository.save(user1);


         return userDto;
    }

    @Override
    public List<AppartmentDto> userApartments(long userId) {
        return apartmentRepository.selectUserApartments(userId);
    }


}
