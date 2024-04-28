package com.fci.cu.houseek.repositories;

import com.fci.cu.houseek.models.ApartmentViews;
import com.fci.cu.houseek.models.FavouriteList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ApartmentViewsRepository extends JpaRepository<ApartmentViews,Long> {


    @Query("SELECT u FROM ApartmentViews u WHERE u.apartmentId= :apartmentId AND u.vistorId= :userId")
    ApartmentViews checkViewsAndSave(@Param("userId")long userId, @Param("apartmentId")long apartmentId);


    @Query("SELECT u FROM ApartmentViews u WHERE u.apartmentId= :apartmentId ")
    List<ApartmentViews> NumOfViews(@Param("apartmentId")long apartmentId);

    @Transactional
    @Modifying
    @Query("UPDATE ApartmentViews m SET m.ownerIsView = true WHERE m.ownerId = :ownerId")
    int updateApartmentIsviewed(@Param("ownerId") long ownerId);

    @Query("SELECT u FROM ApartmentViews u WHERE u.ownerId= :ownerId")
    List<ApartmentViews>whoSeeOwnerApartment(long ownerId);
}
