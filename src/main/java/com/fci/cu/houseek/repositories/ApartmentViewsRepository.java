package com.fci.cu.houseek.repositories;

import com.fci.cu.houseek.models.ApartmentViews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApartmentViewsRepository extends JpaRepository<ApartmentViews,Long> {


    @Query("SELECT u FROM ApartmentViews u WHERE u.apartmentId= :apartmentId AND u.userId= :userId")
    ApartmentViews checkViewsAndSave(@Param("userId")long userId, @Param("apartmentId")long apartmentId);


    @Query("SELECT u FROM ApartmentViews u WHERE u.apartmentId= :apartmentId ")
    List<ApartmentViews> NumOfViews(@Param("apartmentId")long apartmentId);
}
