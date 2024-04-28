package com.fci.cu.houseek.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Table(name = "apartments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "price", nullable = false)
    private float price;

    @Column(name = "propertyType", nullable = false)
    private String propertyType;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "bedrooms", nullable = false)
    private int bedrooms;

    @Column(name = "bathrooms", nullable = false)
    private int bathrooms;

    @Column(name = "area", nullable = false)
    private float area;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "userId", nullable = false)
    private long userId;


    @Column(name = "status", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'pending'")
    private String status;





    @OneToMany(mappedBy = "apartment",  orphanRemoval = true)
    private List<ApartmentImages> images;

    @OneToMany(mappedBy = "apartment",  orphanRemoval = true)
    private List<ProofOfApartmentOwnership> imagesProof;

   //map many apartment to one user
    /*@ManyToOne
    @JoinColumn(name = "user_id")  // This is the foreign key in the apartments table
    private User user;*/


}
