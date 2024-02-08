package com.fci.cu.houseek.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="ApartmentViews")
public class ApartmentViews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "userId", nullable = false)
    private long userId;


    @Column(name = "apartmentId", nullable = false)
    private long apartmentId;




}


