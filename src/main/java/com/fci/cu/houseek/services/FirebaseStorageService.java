package com.fci.cu.houseek.services;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

public class FirebaseStorageService {

    private static final String BUCKET_NAME = "test-97d62.appspot.com";
    private static final String SERVICE_ACCOUNT_FILE = "firebase-admin.json";


    public static String uploadImage(InputStream fileInputStream, String fileName) throws IOException {
        try (InputStream serviceAccountStream = Objects.requireNonNull(FirebaseStorageService.class.getClassLoader().getResourceAsStream(SERVICE_ACCOUNT_FILE))) {
            Storage storage = StorageOptions.newBuilder()
                    .setCredentials(ServiceAccountCredentials.fromStream(serviceAccountStream))
                    .build()
                    .getService();

            BlobId blobId = BlobId.of(BUCKET_NAME, fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/jpeg").build();
            System.out.println("Uploading image....");

            Blob blob = storage.create(blobInfo, fileInputStream);

            // Construct the URL manually using the Firebase Storage URL format
            String bucket = blob.getBucket();
            String path = blob.getName();
            String firebaseStorageUrl = "https://firebasestorage.googleapis.com/v0/b/test-97d62.appspot.com/o/" + fileName + "?alt=media";

            // Return the Firebase Storage URL
            System.out.println(firebaseStorageUrl);
            return firebaseStorageUrl;
        } catch (StorageException e) {
            // Handle StorageException (or specific exceptions) here
            System.err.println("Failed to upload image to Firebase Storage");
            throw new IOException("Failed to upload image to Firebase Storage", e);
        }
    }
}
