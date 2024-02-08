package com.fci.cu.houseek.models;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "ProofOfOwnershipImages")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProofOfApartmentOwnership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String proofImageUrl;  //change to blop


    @ManyToOne
    @JoinColumn(name = "apartment_id") // Use the actual foreign key column name
    private Apartment apartment;

    public void setApartment(Apartment apartment) {
        this.apartment = apartment;
        if (apartment != null && !apartment.getImagesProof().contains(this)) {
            apartment.getImagesProof().add(this);
        }
    }

}
