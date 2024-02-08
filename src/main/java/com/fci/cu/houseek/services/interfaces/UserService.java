package com.fci.cu.houseek.services.interfaces;

import com.fci.cu.houseek.dto.CredentialsDto;
import com.fci.cu.houseek.dto.SignUpDto;
import com.fci.cu.houseek.dto.UserDto;
import com.fci.cu.houseek.models.User;
//import com.fci.cu.houseek.models.UserImage;

public interface UserService {

    // void signUp(User users);
    //  User signIn(String userName,String password);

    // void forgetPassword(String email,String newPassword);

    UserDto register(SignUpDto userDto);

    UserDto login(CredentialsDto credentialsDto);

    UserDto findByLogin(String login);

   // User editUserData(User user);


}