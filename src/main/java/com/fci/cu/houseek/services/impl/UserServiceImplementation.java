package com.fci.cu.houseek.services.impl;

import com.fci.cu.houseek.models.User;
import com.fci.cu.houseek.repositories.UserRepository;
import com.fci.cu.houseek.services.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {
    private final UserRepository userRepository;
    @Override
    public void signUp(User users)
    {
           // return userRepository.save(users);
            String userName=users.getUserName();
            User user=new User();
            user=userRepository.findUserByUsername(userName);
            if(user==null)
            {
                 userRepository.save(users);
            }


    }
    @Override
    public User signIn(String userName, String password) {

            return userRepository.signInn(userName,password);
    }

    public void forgetPassword(String email,String newPassword)
    {
        User user=new User();
        user=userRepository.forgetPassword(email);
        user.setPassword(newPassword);
        userRepository.save(user);
    }

}
