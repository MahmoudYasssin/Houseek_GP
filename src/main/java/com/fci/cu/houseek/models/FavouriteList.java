package com.fci.cu.houseek.models;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

@Data
@Entity
@Table(name = "FavouriteList")
@Setter
public class FavouriteList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "userId", nullable = false)
    private long userId;


    @Column(name = "apartmentId", nullable = false)
    private long apartmentId;


}
