package com.codecool.fileshare.repository;

import com.codecool.fileshare.model.Image;

import java.util.List;

public interface ImageRepository {

    String storeImageFile(String title, String description, String owner, byte[] content, String extension, String tags);

    boolean checkOwner(String owner, String id);

    List<Image> getAll(String owner);
    void delete(String uuid, String owner); //only delete if owner matches

    void updateImage(String id, String title, String description, String tags, String owner); //updates, id, title. only update if owner matches

    byte[] getImageFile(String id);
}
