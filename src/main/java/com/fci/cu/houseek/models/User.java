package com.fci.cu.houseek.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "email",nullable = false)
    private String email;

    @Column(name = "userName",nullable = false)
    private String userName;

    @Column(name = "password",nullable = false)
    private String password;


    @Column(name = "phone",nullable = false)
    private String phone;

    //map one user to many apartment
    /*@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Apartment>userApartment;*/



    @Column(name = "userImage",nullable = true)
    private String userImage;

    @Column(name = "role", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'USER'")
    private String role;











}
