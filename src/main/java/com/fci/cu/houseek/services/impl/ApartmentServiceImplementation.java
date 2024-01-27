package com.fci.cu.houseek.services.impl;

import com.fci.cu.houseek.dto.ApartmentImageDto;
import com.fci.cu.houseek.dto.AppartmentDto;
import com.fci.cu.houseek.models.Apartment;
import com.fci.cu.houseek.models.ApartmentImages;
import com.fci.cu.houseek.models.FavouriteList;
import com.fci.cu.houseek.models.ProofOfApartmentOwnership;
import com.fci.cu.houseek.repositories.ApartmentImagesRepository;
import com.fci.cu.houseek.repositories.ApartmentRepository;
import com.fci.cu.houseek.repositories.FavouriteListRepository;
import com.fci.cu.houseek.repositories.ProofOfApartmentOwnershipRepository;
import com.fci.cu.houseek.services.interfaces.ApartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApartmentServiceImplementation implements ApartmentService {
    private final ApartmentRepository apartmentRepository;
    private final ApartmentImagesRepository apartmentImagesRepository;
    private final ProofOfApartmentOwnershipRepository proofOfApartmentOwnershipRepository;
    private final FavouriteListRepository favouriteListRepository;


    public AppartmentDto convertApartmentToApartmentDto(Apartment apartment)
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
    }


    @Override
    public Apartment saveApartment(Apartment apartment) {

        // Save apartment and images
        Apartment savedApartment = apartmentRepository.save(apartment);

        List<ApartmentImages> images = apartment.getImages();

        List<ProofOfApartmentOwnership> proofImages = apartment.getImagesProof();




//        System.out.println(savedApartment);

        // Set the reference to the apartment in each ApartmentImages object
        for (ApartmentImages image : images) {
//            System.out.println(image);
            image.setApartment(savedApartment);
            apartmentImagesRepository.save(image);
        }

        for (ProofOfApartmentOwnership image : proofImages) {
//            System.out.println(image);
            image.setApartment(savedApartment);
            proofOfApartmentOwnershipRepository.save(image);
        }


        //set images proof

//        apartmentImagesRepository.saveAll(images);

        System.out.println(images.size());

        System.out.println(images);

        // Save the updated ApartmentImages list
//        apartmentImagesRepository.saveAll(images);

        // Return the saved apartment with updated images
        return savedApartment;
    }

    //to return all data to the dashbord
    @Override
    public List<AppartmentDto> selectAll() {
        List<Apartment> apartments = apartmentRepository.findAll();
        List<AppartmentDto> appartmentDtos = new ArrayList<>();

        for (Apartment apartment : apartments) {
            AppartmentDto appartmentDto = new AppartmentDto();
            appartmentDto=convertApartmentToApartmentDto(apartment);

           /* appartmentDto.setId(apartment.getId());
            appartmentDto.setArea(apartment.getArea());
            appartmentDto.setBedrooms(apartment.getBedrooms());
            appartmentDto.setPropertyType(apartment.getPropertyType());
            appartmentDto.setBathrooms(apartment.getBathrooms());
            appartmentDto.setLocation(apartment.getLocation());
            appartmentDto.setPrice(apartment.getPrice());
            appartmentDto.setTitle(apartment.getTitle());
            appartmentDto.setDescription(apartment.getDescription());

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

            appartmentDto.setImages(imageDtos);*/



            appartmentDtos.add(appartmentDto);
        }

        return appartmentDtos;
    }


   public List<AppartmentDto> selectSpecifiedStatus(String status) {

      return apartmentRepository.SelectSpecifiedStatus(status);

    }






        @Override
    public List<AppartmentDto> Search(float area,int bathrooms,int bedrooms,float minPrice,float maxPrice,String propertyType)
    {
        return apartmentRepository.search(area,bathrooms,bedrooms,minPrice,maxPrice,propertyType);
    }


    public AppartmentDto editStatus(Long id, String newStatus) {
        Optional<Apartment> optionalApartment = apartmentRepository.findById(id);

        if (optionalApartment.isPresent()) {
            Apartment apartment = optionalApartment.get();

            // Modify the status
            apartment.setStatus(newStatus);

            // Save the updated apartment
            apartmentRepository.save(apartment);

            // Map the modified apartment to AppartmentDto
            AppartmentDto appartmentDto = new AppartmentDto();
            appartmentDto=convertApartmentToApartmentDto(apartment);

           /* appartmentDto.setId(apartment.getId());
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

            appartmentDto.setImages(imageDtos);*/

            return appartmentDto;
        }

        // Handle the case when the apartment with the specified ID is not found
        // You may throw an exception or return a specific response based on your requirements.
        return null;
    }

    //set user_id ----> apartment_id
    public void favouriteList(long userId,long apartmentId)
    {
        FavouriteList favouriteList=new FavouriteList();
        favouriteList.setApartmentId(apartmentId);
        favouriteList.setUserId(userId);

        favouriteListRepository.save(favouriteList);
    }

    //get
    public List<AppartmentDto> sellectAllfavourite(long userId)
    {

      //  List<Long> userFavouriteApartment = new ArrayList<>();

        List<FavouriteList> userFavouriteApartment = favouriteListRepository.SellectAllfavourite(userId);
        List<AppartmentDto> AllFavouriteApartment = new ArrayList<>();

        for(FavouriteList f: userFavouriteApartment)
        {
            long apartmentId=f.getApartmentId();
            AppartmentDto appartmentDto=new AppartmentDto();
            appartmentDto=favouriteListRepository.SellectAllfavouriteApartment(apartmentId);
            AllFavouriteApartment.add(appartmentDto);
        }

        return AllFavouriteApartment;


    }



}
