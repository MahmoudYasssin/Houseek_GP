package com.fci.cu.houseek.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "firstName",nullable = false)
    private String firstName;

    @Column(name = "lastName",nullable = false)
    private String lastName;

    @Column(name = "email",nullable = false)
    private String email;

    @Column(name = "userName",nullable = false)
    private String userName;

    @Column(name = "password",nullable = false)
    private String password;

   // @Column(name = "confirmPassword",nullable = false)
   // private String confirmPassword;

    @Column(name = "phone",nullable = false)
    private String phone;

    //map one user to many apartment
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Apartment>userApartment;




}
