package com.codecool.fileshare.service;

import com.codecool.fileshare.dto.ImageDataDTO;
import com.codecool.fileshare.dto.ImageUpdateDTO;
import com.codecool.fileshare.model.Image;
import com.codecool.fileshare.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {

    @Autowired
    @Qualifier("jdbc")
    private ImageRepository imageRepository;

    public List<ImageDataDTO> getAll(String user) {
        List<ImageDataDTO> imageDTOs = new ArrayList<>();
        List<Image> images = imageRepository.getAll(user);
        for (Image i : images) {
            String imgUrl = System.getenv("url") + "/api/artwork/" + i.getId() + "." + i.getExtension();
            ImageDataDTO imageDataDTO = new ImageDataDTO(
                    i.getId(),
                    i.getTitle(),
                    i.getDescription(),
                    imgUrl
            );
            imageDTOs.add(imageDataDTO);
        }
        return imageDTOs;
    }

    public boolean checkOwner(String owner, String id) {

        return imageRepository.checkOwner(owner, id);
    }

    public void delete(String id, String owner) {

        imageRepository.delete(id, owner);
    }

    public void updateCategory(String id, ImageUpdateDTO imageUpdateDTO, String owner) {

        imageRepository.updateImage(id, imageUpdateDTO.getTitle(), imageUpdateDTO.getDescription(), owner);
    }

    public byte[] getImageFile(String filename) { //help: filename is for example 41d6608d-0803-4239-9235-09f902fbf705.jpg

            return imageRepository.getImageFile(filename);
    }

    public String storeFile(MultipartFile file, String title, String description, String owner) {
        //help: filename is for example 41d6608d-0803-4239-9235-09f902fbf705.jpg

        byte[] content;
        try {
            content = file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String extension= file.getOriginalFilename().split("\\.")[1];
        return imageRepository.storeImageFile(title, description, owner, content, extension) + "." + extension;
    }
}
