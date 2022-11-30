package com.codecool.fileshare.repository;

import com.codecool.fileshare.model.Image;
import org.springframework.stereotype.Component;

import java.util.List;

@Component("jdbc")
public class ImageJdbcRepository implements ImageRepository {

    static final String ADDRESS = System.getenv("ADDRESS");
    static final int PORT = Integer.parseInt(System.getenv("PORT"));
    static final String USERNAME = System.getenv("USERNAME");
    static final String PASSWORD = System.getenv("PASSWORD");

    static final String DB_NAME = "newimagedb";
    static final String DB_TYPE = "jdbc:postgresql";

    static final String DB_URL = DB_TYPE + "://" + ADDRESS + ":" + PORT + "/" + DB_NAME;


    @Override
    public String storeImageFile(String title, String description, String owner, byte[] content, String extension) {
        return null;
    }

    @Override
    public boolean checkOwner(String owner, String id) {
        return false;
    }

    @Override
    public List<Image> getAll(String owner) {
        return null;
    }

    @Override
    public void delete(String uuid, String owner) {

    }

    @Override
    public void updateImage(String id, String title, String description, String owner) {

    }

    @Override
    public byte[] getImageFile(String id) {
        return new byte[0];
    }
}

