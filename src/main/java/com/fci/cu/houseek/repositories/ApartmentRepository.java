package com.fci.cu.houseek.repositories;

import com.fci.cu.houseek.dto.ApartmentImageDto;
import com.fci.cu.houseek.dto.AppartmentDto;
import com.fci.cu.houseek.models.Apartment;
import com.fci.cu.houseek.models.FavouriteList;
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
            "AND a.location = :location "+
            "AND a.bathrooms = :bathrooms " +
            "AND a.bedrooms = :bedrooms " +
            "AND a.price > :minPrice " +
            "AND a.price < :maxPrice " +
            "AND a.propertyType = :propertyType")
    List<AppartmentDto> search(
                                @Param("location") String location,
                                @Param("area") float area,
                               @Param("bathrooms") int bathrooms,
                               @Param("bedrooms") int bedrooms,
                               @Param("minPrice") float minPrice,
                               @Param("maxPrice") float maxPrice,
                               @Param("propertyType") String propertyType);


    @Query("SELECT u FROM Apartment u WHERE u.status = :status")
    List<AppartmentDto> SelectSpecifiedStatus(@Param("status") String status);

 //   @Query("SELECT U FROM Apartment u WHERE u.id = :apartmentId")
  //  Apartment findApartmentById(@Param("apartmentId")long apartmentId);



    @Query("SELECT u FROM Apartment u WHERE u.userId = :userId")
    List<AppartmentDto> selectUserApartments(@Param("userId") long userId);




    @Query("SELECT u FROM FavouriteList u WHERE u.vistorId = :userId AND u.apartmentId= :apartmentId")
    List<FavouriteList> apartmentIfExistInFav(@Param("userId") long userId, long apartmentId);


   // @Query("SELECT u FROM Apartment u WHERE u.status = :status")
   @Query("SELECT COUNT(u) FROM Apartment u WHERE u.status LIKE %:status%")
    long numOfSepcificStatus(String status);


    //@Query("SELECT u FROM Apartment u WHERE u.propertyType = :propertyType")
    @Query("SELECT COUNT(u) FROM Apartment u WHERE u.title LIKE %:title%")
    long numOfApartmentTitle(String title);



    //@Query("SELECT u FROM Apartment u WHERE u.propertyType = :propertyType")
    @Query("SELECT COUNT(u) FROM Apartment u WHERE u.location LIKE %:location%")
    long numOfAparmtmentInCity(String location);





}


