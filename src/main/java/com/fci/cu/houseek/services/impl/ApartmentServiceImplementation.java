package com.fci.cu.houseek.services.impl;

import com.fci.cu.houseek.dto.ApartmentImageDto;
import com.fci.cu.houseek.dto.AppartmentDto;
import com.fci.cu.houseek.dto.Notification;
import com.fci.cu.houseek.models.*;
import com.fci.cu.houseek.repositories.*;
import com.fci.cu.houseek.services.interfaces.ApartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
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
    private final ApartmentViewsRepository apartmentViewsRepository;
    private final MessagesRepository messagesRepository;
    private  final UserRepository userRepository;


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

     //   System.out.println(images.size());

    //    System.out.println(images);

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
            long userId;
            userId=apartment.getUserId();
            User user=new User();
            user=userRepository.findUserById(userId);
            String apartmentOwnerUserName;
            apartmentOwnerUserName=user.getUserName();
            appartmentDto.setApartmentOwner(apartmentOwnerUserName);



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
    public List<AppartmentDto> Search(String location,float area,int bathrooms,int bedrooms,float minPrice,float maxPrice,String propertyType)
    {
        return apartmentRepository.search(location,area,bathrooms,bedrooms,minPrice,maxPrice,propertyType);
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
    public void addToFavouriteList(long vistorId,long apartmentId) {
        List<FavouriteList> favouriteList = new ArrayList<>();
        FavouriteList f = new FavouriteList();
        favouriteList = apartmentRepository.apartmentIfExistInFav(vistorId, apartmentId);

        if (favouriteList.isEmpty()) {
            Optional<Apartment> apartment = apartmentRepository.findById(apartmentId);
            if (apartment.isPresent()) {
                Apartment apartment1 = apartment.get();
                f.setApartmentId(apartmentId);
                f.setVistorId(vistorId);
                f.setOwnerId(apartment1.getUserId());
                f.setOwnerIsView(false);
                favouriteListRepository.save(f);
            }

        }
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
   public void removeFromFavouriteList(long userId,long apartmentId)
    {
       FavouriteList favouriteList= favouriteListRepository.removeFavouriteListByAU(userId,apartmentId);
       long favouriteListId=favouriteList.getId();
        favouriteListRepository.deleteById(favouriteListId);
    }

    public long HowManyApartmentExist(long apartmentId) {
        List<FavouriteList> userFavouriteApartment = favouriteListRepository.howManyApartmentExist(apartmentId);
        long num = userFavouriteApartment.size();
        return num;

    }

    @Override
    public long numOfApartmentViews(long userId, long apartmentId)
    {
        List<ApartmentViews>apartmentViews1=apartmentViewsRepository.findAll();
        ApartmentViews apartmentViews=apartmentViewsRepository.checkViewsAndSave(userId,apartmentId);

        if(apartmentViews1.isEmpty() || apartmentViews==null)
        {
            Optional<Apartment> apartment=apartmentRepository.findById(apartmentId);
            Apartment apartment1;

            long owner_id = 0;
            if (apartment.isPresent())
            {
                apartment1 = apartment.get();
                owner_id=apartment1.getUserId();
            }

            ApartmentViews apartmentViews2=new ApartmentViews();
            apartmentViews2.setApartmentId(apartmentId);
            apartmentViews2.setVistorId(userId);
            apartmentViews2.setOwnerIsView(false);
            apartmentViews2.setOwnerId(owner_id);
            apartmentViewsRepository.save(apartmentViews2);
        }


        List<ApartmentViews>apartmentViews3=apartmentViewsRepository.NumOfViews(apartmentId);
        return apartmentViews3.size();

    }

    @Override
    public void userMessages(long apartmentId, String message) {
        Message message1=new Message();
        Optional<Apartment> apartment=apartmentRepository.findById(apartmentId);
        Apartment apartment1=new Apartment();
        long owner_id = 0;
        if (apartment.isPresent())
        {
            apartment1 = apartment.get();
            owner_id=apartment1.getUserId();
        }
        User user=new User();
        user=userRepository.findUserById(owner_id);
        String userName;
        userName=user.getUserName();


        message1.setUserName(userName);
        message1.setMessage(message);
        message1.setIsRead(false);
        messagesRepository.save(message1);
    }

    @Override
    public List<Notification> userAllMessages(String userName) {
        List<Message> messageList = new ArrayList<>();
        List<Notification> messageListfinall = new ArrayList<>();


        // Fetch messages from repository
        messageList = messagesRepository.allMessages(userName);
        for(Message m:messageList)
        {
            Notification notification=new Notification() ;
            notification.setIsRead(m.getIsRead());
            notification.setMessage(m.getMessage());
            notification.setWho("admin");
            messageListfinall.add(notification);
        }


        //update is read with true
        //messagesRepository.updateMessageByUser(userName);


        // Return the modified message list
        return messageListfinall;
    }

    @Override
    public List<Notification> messageWhoAddToFavList(String username) {
        Optional<User> user=userRepository.findUserByUsername(username);


        User user1;
        List<Notification>AllViewers =new ArrayList<>();

        long owner_id = 0;
        if (user.isPresent())
        {
                user1 = user.get();
                 owner_id=user1.getId();
        }
        List<FavouriteList>favouriteLists;
        favouriteLists=favouriteListRepository.whoSeeOwnerApartment(owner_id);
       /// System.out.println(favouriteLists.size());
        //System.out.println("---------------------");

        for (FavouriteList f:favouriteLists)
        {
            long vistorId;
            vistorId=f.getVistorId();
            //System.out.println(vistorId);

            User user2=userRepository.findUserById(vistorId);
           /// System.out.println(user2);

            if(user2==null)
            {
                System.out.println("User Not Found");
            }

            String vistorName;
            vistorName=user2.getUserName();
          //  System.out.println(vistorName);

            Notification notification =new Notification();
            notification.setWho(vistorName);
            notification.setIsRead(f.getOwnerIsView());
            notification.setMessage(vistorName+" add your apartment to the Fav lIst");///////**
            System.out.println(notification);

            AllViewers.add(notification);
          //  System.out.println(AllViewers.size());

         //   System.out.println(AllViewers);


        }
       // favouriteListRepository.updateFavListIsRead(owner_id);
        return AllViewers;
    }

    @Override
    public List<Notification> messageWhoViewApartment(String userName) {
        Optional<User> user=userRepository.findUserByUsername(userName);
       // System.out.println(user);
       // System.out.println("--------------");

        User user1;
        List<Notification>AllViewers =new ArrayList<>();


        long owner_id = 0;
        if (user.isPresent())
        {
            user1 = user.get();
            owner_id=user1.getId();
           // System.out.println(owner_id);
          //  System.out.println("------------------");


        }

        List<ApartmentViews>apartmentViews;
        apartmentViews=apartmentViewsRepository.whoSeeOwnerApartment(owner_id);

        for (ApartmentViews f:apartmentViews)
        {
            long vistorId;
            vistorId=f.getVistorId();
            System.out.println(vistorId);

            User user2=userRepository.findUserById(vistorId);

            if(user2==null)
            {
                System.out.println("User Not Found");
            }

            String vistorName;
            vistorName=user2.getUserName();
            System.out.println(vistorName);

            Notification notification =new Notification();
            notification.setWho(vistorName);
            notification.setIsRead(f.getOwnerIsView());
            notification.setMessage(vistorName+" view your apartment and check it");///////**

            System.out.println(notification);

            AllViewers.add(notification);



        }
       // apartmentViewsRepository.updateApartmentIsviewed(owner_id);
        return AllViewers;


    }

    @Override
    public void editMessageStatus(String UserName) {

        messagesRepository.updateMessageByUser(UserName);

        Optional<User> user=userRepository.findUserByUsername(UserName);


        User user1;

        long owner_id = 0;
        if (user.isPresent())
        {
            user1 = user.get();
            owner_id=user1.getId();
        }

        apartmentViewsRepository.updateApartmentIsviewed(owner_id);  //edit view status
        favouriteListRepository.updateFavListIsRead(owner_id); //edit fav status

    }

  /*  @Override
    public void findMostApartmentFreq() {
        long id=favouriteListRepository.findMostFrequentApartmentId();
        System.out.println("The Most Apartment founded is:"+id);
        /*Apartment apartment=apartmentRepository.findApartmentById(id);
        System.out.println(apartment);



        AppartmentDto appartmentDto=new AppartmentDto();
        appartmentDto=convertApartmentToApartmentDto(apartment);
    }*/

    @Override
    public List<AppartmentDto> selectAllForDash() {
        List<Apartment> apartments = apartmentRepository.findAll();
        List<AppartmentDto> appartmentDtos = new ArrayList<>();

        for (Apartment apartment : apartments) {
            AppartmentDto appartmentDto = new AppartmentDto();
            appartmentDto=convertApartmentToApartmentDto(apartment);



            List<ApartmentImageDto> imageDtos = apartment.getImagesProof()
                    .stream()
                    .map(image -> {
                        ApartmentImageDto imageDto = new ApartmentImageDto();
                        imageDto.setId(image.getId());
                        imageDto.setImageUrl(image.getProofImageUrl());
                        return imageDto;
                    })
                    .collect(Collectors.toList());

            appartmentDto.setImagesProof(imageDtos);

            long userId;
            userId=apartment.getUserId();
            User user=new User();
            user=userRepository.findUserById(userId);
            String apartmentOwnerUserName;
            apartmentOwnerUserName=user.getUserName();
            appartmentDto.setApartmentOwner(apartmentOwnerUserName);
            appartmentDtos.add(appartmentDto);
        }

        return appartmentDtos;
    }


}
