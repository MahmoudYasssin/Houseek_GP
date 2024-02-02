//package com.fci.cu.houseek.controllers;
//
//import com.fci.cu.houseek.models.User;
//import com.fci.cu.houseek.services.interfaces.UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.repository.query.Param;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/User/")
//
//public class UserController {
//
//    private final UserService userService;
//
//    @PostMapping("/signUp")
//    public void signUp(@RequestBody User user)
//    {
//
//         userService.signUp(user);
//    }
//    @PostMapping("/signIn")
//    public User signIn(@Param("userName") String userName, @Param("password") String password)
//    {
//        return userService.signIn(userName,password);
//    }
//
//    @PostMapping("/forgetPassword")
//    public void forgetPassword(@Param("email") String email, @Param("newPassword") String newPassword)
//    {
//        userService.forgetPassword(email,newPassword);
//    }
//
//}
