package com.fci.cu.houseek.controllers;

import com.fci.cu.houseek.dto.AppartmentDto;
import com.fci.cu.houseek.models.Apartment;
import com.fci.cu.houseek.models.ApartmentImages;
import com.fci.cu.houseek.models.ProofOfApartmentOwnership;
import com.fci.cu.houseek.models.User;
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

//localhost7070/apartment/sell/save
@RestController
@RequiredArgsConstructor
@RequestMapping("/apartment/sell")
@CrossOrigin(origins = "http://localhost:3000")
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
            @RequestParam("user_id") long user_id

    )

    {


        try
        {
            Apartment newApartment = buildApartment(title, price, description, location, area, bedrooms, bathrooms, propertyType, images,proofImages,user_id);
            Apartment savedApartment = apartmentService.saveApartment(newApartment);
            return ResponseEntity.ok(savedApartment);
        }
        catch (IOException e)
        {
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
            List<MultipartFile> images,List<MultipartFile> proofImages,long user_id) throws IOException {

        Apartment newApartment = new Apartment();
        newApartment.setTitle(title);
        newApartment.setPrice(price);
        newApartment.setDescription(description);
        newApartment.setLocation(location);
        newApartment.setArea(area);
        newApartment.setBedrooms(bedrooms);
        newApartment.setBathrooms(bathrooms);
        newApartment.setPropertyType(propertyType);
        newApartment.setUserId(user_id);
        newApartment.setStatus("pending");


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
        //User user=new User();
        //user.setId(user_id);
       // newApartment.setUser(user);

        newApartment.setImages(uploadedImageUrls);
        newApartment.setImagesProof(uploadedProofImageUrls);

        return newApartment;
    }

   @PostMapping ("/search")
   public List<AppartmentDto> search(
                                       @RequestParam("location") String location,
                                       @RequestParam("area") float area,
                                      @RequestParam("bathrooms") int bathrooms,
                                      @RequestParam("bedrooms") int bedrooms,
                                      @RequestParam("minPrice") float minPrice,
                                      @RequestParam("maxPrice") int maxPrice,
                                      @RequestParam("propertyType") String propertyType)
    {
       return apartmentService.Search(location,area,bathrooms,bedrooms,minPrice,maxPrice,propertyType);
    }

    @GetMapping("/approval")
    public AppartmentDto edit(@RequestParam("id") Long id,@RequestParam("status") String status)
    {
        return apartmentService.editStatus(id,status);
    }

    @PostMapping ("/FavouriteList")
    public void addToFavouriteList(@RequestParam("userId") Long userId,@RequestParam("apartmentId") long apartmentId)
    {
        apartmentService.addToFavouriteList(userId,apartmentId);
    }

   /* @GetMapping("/sellectAllfavourite")
    public List<AppartmentDto> sellectAllfavourite(@RequestParam("userId") Long userId)
    {
        return  apartmentService.sellectAllfavourite(userId);
    }*/

    @GetMapping("/sellectAllfavouriteApartment")
    public List<AppartmentDto> sellectAllfavouriteApartment(@RequestParam("userId") Long userId)
    {
        return apartmentService.sellectAllfavourite(userId);
    }

    @PostMapping ("/removeFromFavouriteList")
    public void removeFromFavouriteList(@RequestParam("userId") Long userId,@RequestParam("apartmentId") Long apartmentId)
    {
         apartmentService.removeFromFavouriteList(userId,apartmentId);
    }

    @GetMapping ("/howManyApartmentExistInFav")
    public long howManyApartmentExist(@RequestParam("apartmentId") Long apartmentId)
    {
      return   apartmentService.HowManyApartmentExist(apartmentId);
    }

    @GetMapping ("/numOfApartmentViews")
    public long numOfApartmentViews(@RequestParam("userId") Long userId,@RequestParam("apartmentId") Long apartmentId)
    {
        return apartmentService.numOfApartmentViews(userId,apartmentId);
    }

    //edit status
    @PostMapping("/editApartmentStatus")
    public void editApartmentStatus(@RequestParam("apartmentId")Long apartmentId,@RequestParam("newStatus") String newStatus)
    {
        apartmentService.editStatus(apartmentId,newStatus);
    }





}
