package com.fci.cu.houseek.services.interfaces;

import com.fci.cu.houseek.dto.AppartmentDto;
import com.fci.cu.houseek.models.Apartment;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ApartmentService {
    Apartment saveApartment(Apartment apartment);
    List<AppartmentDto> selectAll();

    List<AppartmentDto> selectSpecifiedStatus(String status);

    List<AppartmentDto> Search(float area,int bathrooms,int bedrooms,float minPrice,float maxPrice,String propertyType);

    AppartmentDto editStatus(Long id,String status);

     void favouriteList(long userId,long apartmentId);

    List<AppartmentDto> sellectAllfavourite(long userId);

    AppartmentDto convertApartmentToApartmentDto(Apartment apartment);



}