package com.fci.cu.houseek.services.interfaces;

import com.fci.cu.houseek.models.User;

public interface UserService {

    User signUp(User users);
    User signIn(String userName,String password);

    void forgetPassword(String email,String newPassword);

}
