package com.fci.cu.houseek.repositories;

import com.fci.cu.houseek.dto.ApartmentImageDto;
import com.fci.cu.houseek.dto.AppartmentDto;
import com.fci.cu.houseek.models.Apartment;
import com.fci.cu.houseek.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ApartmentRepository extends JpaRepository<Apartment, Long> {




    @Query("SELECT new com.fci.cu.houseek.dto.AppartmentDto(a) " +
            "FROM Apartment a " +
            "WHERE a.area = :area " +
            "AND a.bathrooms = :bathrooms " +
            "AND a.bedrooms = :bedrooms " +
            "AND a.price > :minPrice " +
            "AND a.price < :maxPrice " +
            "AND a.propertyType = :propertyType")
    List<AppartmentDto> search(@Param("area") float area,
                               @Param("bathrooms") int bathrooms,
                               @Param("bedrooms") int bedrooms,
                               @Param("minPrice") float minPrice,
                               @Param("maxPrice") float maxPrice,
                               @Param("propertyType") String propertyType);


    @Query("SELECT u FROM Apartment u WHERE u.status = :status")
    List<AppartmentDto> SelectSpecifiedStatus(@Param("status") String status);

}


