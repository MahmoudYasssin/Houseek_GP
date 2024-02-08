package com.fci.cu.houseek.repositories;

import com.fci.cu.houseek.dto.AppartmentDto;
import com.fci.cu.houseek.models.Apartment;
import com.fci.cu.houseek.models.FavouriteList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FavouriteListRepository extends JpaRepository<FavouriteList, Long> {

    @Query("SELECT u FROM FavouriteList u WHERE u.userId= :userId")
    List<FavouriteList>  SellectAllfavourite(long userId);

    @Query("SELECT new com.fci.cu.houseek.dto.AppartmentDto(a) FROM Apartment a WHERE a.id= :apartmentId")
    AppartmentDto SellectAllfavouriteApartment(long apartmentId);


    @Query("SELECT u FROM FavouriteList u WHERE u.userId= :userId AND u.apartmentId= :apartmentId")
    FavouriteList removeFavouriteListByAU(long userId,long apartmentId);


    @Query("SELECT u FROM FavouriteList u WHERE u.apartmentId= :apartmentId")
   List<FavouriteList>howManyApartmentExist(long apartmentId);



}
