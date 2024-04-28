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

    @Column(name = "vistorId", nullable = false)
    private long vistorId;

    @Column(name = "ownerId", nullable = false)
    private long ownerId;


    @Column(name = "apartmentId", nullable = false)
    private long apartmentId;


    @Column(name = "ownerIsView",  nullable = false, columnDefinition = "VARCHAR(8) DEFAULT 'false'")
    private Boolean ownerIsView;




}


