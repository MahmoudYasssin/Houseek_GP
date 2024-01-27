package com.fci.cu.houseek.dto;

import com.fci.cu.houseek.models.ApartmentImages;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;
import com.fci.cu.houseek.dto.AppartmentDto;
import com.fci.cu.houseek.models.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
//@AllArgsConstructor




@NoArgsConstructor
@Getter
@Setter
@Data
public class AppartmentDto {

    private long id;
    private float price;
    private String propertyType;
    private String location;
    private int bedrooms;
    private int bathrooms;
    private float area;
    private String title;
    private String description;
    private String status;
    private List<ApartmentImageDto> images;



    // Other constructors for the complete object
    public AppartmentDto(long id, float price, String propertyType, String location, int bedrooms, int bathrooms, float area, String title, String description, String status,List<ApartmentImages> imagess) {
        this.id = id;
        this.price = price;
        this.propertyType = propertyType;
        this.location = location;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.area = area;
        this.title = title;
        this.description = description;
        this.status = status;


        images = imagess
                .stream()
                .map(image -> {
                    ApartmentImageDto imageDto = new ApartmentImageDto();
                    imageDto.setId(image.getId());
                    imageDto.setImageUrl(image.getImageUrl());
                    return imageDto;
                })
                .collect(Collectors.toList());

       // setImages(images);

    }

}
