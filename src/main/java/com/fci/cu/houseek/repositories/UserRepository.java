package com.fci.cu.houseek.repositories;

import com.fci.cu.houseek.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.userName = :userName")
    Optional<User> findUserByUsername(@Param("userName") String userName);

   // Optional<User> findByLogin(String login);  //-- findUserByUsername


    @Query("SELECT u FROM User u WHERE u.id = :id")
    User findUserById(@Param("Id") long id);



    /*
    String email, String password
     */

    @Query("SELECT u FROM User u WHERE u.userName = :userName AND u.password = :password")

    User signInn(@Param("userName") String userName, @Param("password") String password);


    @Query("SELECT u FROM User u WHERE u.email = :email ")
    User forgetPassword(@Param("email") String email);



}
