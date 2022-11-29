package com.codecool.fileshare.controller;

import com.codecool.fileshare.dto.ImageDataDTO;
import com.codecool.fileshare.dto.ImageUpdateDTO;
import com.codecool.fileshare.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "/api/artwork")
public class ImageController {

    private ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping
    public List<ImageDataDTO> getAll(Authentication authentication){
        return imageService.getAll(authentication.getName());
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> delete(@PathVariable("uuid") String id, Authentication authentication) {
        if(!imageService.checkOwner(authentication.getName(),id)){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        imageService.delete(id, authentication.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{uuid}")
    public ResponseEntity<Void> updateCategory(@PathVariable("uuid") String id, @RequestBody ImageUpdateDTO imageUpdateDTO, Authentication authentication){
        if(!imageService.checkOwner(authentication.getName(),id)){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        imageService.updateCategory(id, imageUpdateDTO, authentication.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename, Authentication authentication) {
        String id = filename.split("\\.")[0];
        if(!imageService.checkOwner(authentication.getName(),id)){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        };
        byte[] file = imageService.getImageFile(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "inline").body(new ByteArrayResource(file));
    }

    @PostMapping()
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   @RequestParam("title") String title,
                                   @RequestParam("description") String description,
                                   Authentication authentication) {
        return imageService.storeFile(file,title, description, authentication.getName());

    }
}
