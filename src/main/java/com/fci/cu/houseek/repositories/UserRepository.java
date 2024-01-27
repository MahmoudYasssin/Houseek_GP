package com.fci.cu.houseek.repositories;

import com.fci.cu.houseek.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository  extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.userName = :userName")
    User findUserByUsername(@Param("userName") String userName);



    /*
    String email, String password
     */

    @Query("SELECT u FROM User u WHERE u.userName = :userName AND u.password = :password")

    User signInn(@Param("userName") String userName, @Param("password") String password);


    @Query("SELECT u FROM User u WHERE u.email = :email ")
    User forgetPassword(@Param("email") String email);



}
