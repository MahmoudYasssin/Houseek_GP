package com.fci.cu.houseek.controllers;

import com.fci.cu.houseek.dto.AppartmentDto;
import com.fci.cu.houseek.models.Apartment;
import com.fci.cu.houseek.models.ApartmentImages;
import com.fci.cu.houseek.models.ProofOfApartmentOwnership;
import com.fci.cu.houseek.services.FirebaseStorageService;
import com.fci.cu.houseek.services.interfaces.ApartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/apartment/sell")

public class ApartmentController {
    private final ApartmentService apartmentService;
    @PostMapping("/save")
    public ResponseEntity<?> saveApartment(
            @RequestParam("images") List<MultipartFile> images,
            @RequestParam("proofImages") List<MultipartFile> proofImages,
            @RequestParam("title") String title,
            @RequestParam("price") float price,
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam("area") float area,
            @RequestParam("bedrooms") int bedrooms,
            @RequestParam("bathrooms") int bathrooms,
            @RequestParam("propertyType") String propertyType,
            @RequestParam("status") String status)

    {

        try {
            Apartment newApartment = buildApartment(title, price, description, location, area, bedrooms, bathrooms, propertyType, images,proofImages,status);
            Apartment savedApartment = apartmentService.saveApartment(newApartment);
            return ResponseEntity.ok(savedApartment);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving apartment");
        }
    }
    @GetMapping("/selectAll")
    public List<AppartmentDto>selectAll()
    {
        return apartmentService.selectAll();
    }

    @GetMapping("/selectSpecifiedStatus")
    public List<AppartmentDto>selectSpecifiedStatus( @RequestParam("status") String status)
    {
        return apartmentService.selectSpecifiedStatus(status);
    }

    private Apartment buildApartment(
            String title, float price, String description, String location,
            float area, int bedrooms, int bathrooms, String propertyType,
            List<MultipartFile> images,List<MultipartFile> proofImages,String status) throws IOException {

        Apartment newApartment = new Apartment();
        newApartment.setTitle(title);
        newApartment.setPrice(price);
        newApartment.setDescription(description);
        newApartment.setLocation(location);
        newApartment.setArea(area);
        newApartment.setBedrooms(bedrooms);
        newApartment.setBathrooms(bathrooms);
        newApartment.setPropertyType(propertyType);
        newApartment.setStatus(status);


        List<ApartmentImages> uploadedImageUrls = new ArrayList<ApartmentImages>();
        List<ProofOfApartmentOwnership> uploadedProofImageUrls = new ArrayList<ProofOfApartmentOwnership>();

        for (MultipartFile image : images) {
            try (InputStream fileInputStream = image.getInputStream()) {
                String fileName = image.getOriginalFilename();
                String uploadedImageUrl = FirebaseStorageService.uploadImage(fileInputStream, fileName);
                ApartmentImages newImage = new ApartmentImages();
                newImage.setImageUrl(uploadedImageUrl);
                uploadedImageUrls.add(newImage);
            }
        }
        for (MultipartFile image : proofImages) {
            try (InputStream fileInputStream = image.getInputStream()) {
                String fileName = image.getOriginalFilename();
                String uploadedImageUrl = FirebaseStorageService.uploadImage(fileInputStream, fileName);
                ProofOfApartmentOwnership newImage = new ProofOfApartmentOwnership();
                newImage.setProofImageUrl(uploadedImageUrl);
                uploadedProofImageUrls.add(newImage);
            }
        }

        newApartment.setImages(uploadedImageUrls);
        newApartment.setImagesProof(uploadedProofImageUrls);

        return newApartment;
    }

   @GetMapping("/search")
   public List<AppartmentDto> search( @RequestParam("area") float area,@RequestParam("bathrooms") int bathrooms,@RequestParam("bedrooms") int bedrooms,@RequestParam("minPrice") float minPrice,@RequestParam("maxPrice") int maxPrice,@RequestParam("propertyType") String propertyType)
    {
       return apartmentService.Search(area,bathrooms,bedrooms,minPrice,maxPrice,propertyType);
    }

    @GetMapping("/approval")
    public AppartmentDto edit(@RequestParam("id") Long id,@RequestParam("status") String status)
    {
        return apartmentService.editStatus(id,status);
    }

    @GetMapping("/FavouriteList")
    public void FavouriteList(@RequestParam("userId") Long userId,@RequestParam("apartmentId") long apartmentId)
    {
        apartmentService.favouriteList(userId,apartmentId);
    }

    @GetMapping("/sellectAllfavourite")
    public void sellectAllfavourite(@RequestParam("userId") Long userId)
    {
        apartmentService.sellectAllfavourite(userId);
    }

    @GetMapping("/sellectAllfavouriteApartment")
    public List<AppartmentDto> sellectAllfavouriteApartment(@RequestParam("userId") Long userId)
    {
        return  apartmentService.sellectAllfavourite(userId);
    }



}