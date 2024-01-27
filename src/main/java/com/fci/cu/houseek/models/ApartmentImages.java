package com.fci.cu.houseek.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
@Entity
@Table(name = "ApartmentImages")
@Setter
public class ApartmentImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;  //change to blop

    @ManyToOne
    @JoinColumn(name = "apartment_id") // Use the actual foreign key column name
    private Apartment apartment;

    public void setApartment(Apartment apartment) {
        this.apartment = apartment;
        if (apartment != null && !apartment.getImages().contains(this)) {
            apartment.getImages().add(this);
        }
    }
}
