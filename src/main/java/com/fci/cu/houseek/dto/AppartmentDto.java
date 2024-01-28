package com.fci.cu.houseek.dto;

import com.fci.cu.houseek.models.ApartmentImages;
import lombok.*;

import java.util.Collections;
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
    public AppartmentDto(Apartment apartment) {
        this.id = apartment.getId();
        this.price = apartment.getPrice();
        this.propertyType = apartment.getPropertyType();
        this.location = apartment.getLocation();
        this.bedrooms = apartment.getBedrooms();
        this.bathrooms = apartment.getBathrooms();
        this.area = apartment.getArea();
        this.title = apartment.getTitle();
        this.description = apartment.getDescription();
        this.status = apartment.getStatus();
     //   images= Collections.emptyList();
        this.images=apartment.getImages()
                .stream()
                .map(image -> {
                    ApartmentImageDto imageDto = new ApartmentImageDto();
                    imageDto.setId(image.getId());
                    imageDto.setImageUrl(image.getImageUrl());
                    return imageDto;
                })
                .collect(Collectors.toList());


    }
  /*  public AppartmentDto convertApartmentToApartmentDto(Apartment apartment)
    {
        AppartmentDto appartmentDto = new AppartmentDto();

        appartmentDto.setId(apartment.getId());
        appartmentDto.setArea(apartment.getArea());
        appartmentDto.setBedrooms(apartment.getBedrooms());
        appartmentDto.setPropertyType(apartment.getPropertyType());
        appartmentDto.setBathrooms(apartment.getBathrooms());
        appartmentDto.setLocation(apartment.getLocation());
        appartmentDto.setPrice(apartment.getPrice());
        appartmentDto.setTitle(apartment.getTitle());
        appartmentDto.setDescription(apartment.getDescription());
        appartmentDto.setStatus(apartment.getStatus());

        // Map ApartmentImages to ApartmentImageDto
        List<ApartmentImageDto> imageDtos = apartment.getImages()
                .stream()
                .map(image -> {
                    ApartmentImageDto imageDto = new ApartmentImageDto();
                    imageDto.setId(image.getId());
                    imageDto.setImageUrl(image.getImageUrl());
                    return imageDto;
                })
                .collect(Collectors.toList());

        appartmentDto.setImages(imageDtos);

        return appartmentDto;
    }*/



}
