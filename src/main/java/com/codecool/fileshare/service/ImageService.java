package com.codecool.fileshare.service;

import com.codecool.fileshare.dto.ImageDataDTO;
import com.codecool.fileshare.dto.ImageUpdateDTO;
import com.codecool.fileshare.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ImageService {

    @Autowired
    @Qualifier("jdbc")
    private ImageRepository imageRepository;

    public List<ImageDataDTO> getAll(String user) {
        //get owned by user.
        //help: imgurl = System.getenv("url") + "/api/artwork/" + id + "." +image.getExtension();

        return null;
    }

    public boolean checkOwner(String owner, String id) {


        return false;
    }

    public void delete(String id, String owner) {


    }

    public void updateCategory(String id, ImageUpdateDTO imageUpdateDTO, String owner) {

    }

    public byte[] getImageFile(String filename) { //help: filename is for example 41d6608d-0803-4239-9235-09f902fbf705.jpg

        try {
            return Files.readAllBytes(Paths.get(filename));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String storeFile(MultipartFile file, String title, String description, String owner) {
        //help: filename is for example 41d6608d-0803-4239-9235-09f902fbf705.jpg
        return "";
    }
}
