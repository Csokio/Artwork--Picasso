package com.codecool.fileshare.repository;

import com.codecool.fileshare.model.Image;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Scanner;

import static java.util.UUID.randomUUID;

@Component("file")
public class ImageFileRepository implements ImageRepository {

    private final String DATA_FILE = "src/imagedb/imageInfos.csv";
//    private final String USER_FILE = "src/imagedb/users.csv";

    @SneakyThrows
    @Override
    public String storeImageFile(String title, String description, String owner, byte[] content, String extension, String tags) {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream("src/imagedb/" + title + "." + extension);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        try {
            fos.write(content);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            fos.close();
        }

        StringBuilder writer = new StringBuilder();
        writer.append(randomUUID()).append(";");
        writer.append(title).append(";");
        writer.append(description).append(";");
        writer.append(tags).append(";");
        writer.append(extension).append(";");
//        writer.append(owner).append(";");
//        writer.append("src/imagedb/").append(title).append(".").append(extension).append(";");
        try {
            FileWriter fw = new FileWriter(DATA_FILE, true);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(writer.toString());
            bw.newLine();
            bw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return title;
    }

    @Override
    public boolean checkOwner(String owner, String id) {
//        List<AppUser> appUsers = new ArrayList<>();
//        Scanner scanner = null;
//        try {
//            scanner = new Scanner(new File(USER_FILE));
//        } catch (FileNotFoundException e) {
//            throw new RuntimeException(e);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        while (scanner.hasNextLine()) {
//            String[] line = scanner.nextLine().split(";")
//        }
//        return false;

        return true;
    }

    @Override
    public List<Image> getAll() { // kiszedtem a String owner-t a paraméterek közül
        List<Image> imageList = new ArrayList<>();
        Scanner scanner = null;
        try {
            scanner = new Scanner(new File(DATA_FILE));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            e.printStackTrace();
        }
        while (scanner.hasNextLine()) {
            String[] line = scanner.nextLine().split(";");
            imageList.add(new Image(line[0], line[1], line[2], line[3], line[4]));
        }
        scanner.close();
        return imageList;
    }

    public List<Image> getAll(String owner) { // kiszedtem a String owner-t a paraméterek közül
        List<Image> imageList = new ArrayList<>();
        Scanner scanner = null;
        try {
            scanner = new Scanner(new File(DATA_FILE));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            e.printStackTrace();
        }
        while (scanner.hasNextLine()) {
            String[] line = scanner.nextLine().split(";");
            imageList.add(new Image(line[0], line[1], line[2], line[3], line[4]));
        }
        scanner.close();
        return imageList;
    }

    @Override
    public void delete(String uuid, String owner) {
        List<Image> images = getAll();
        Image searchedImage = images.stream().filter(image -> Objects.equals(image.getId(), uuid))
                .findAny()
                .orElse(null);
        if (searchedImage != null) {
            images.remove(searchedImage);
        }

        //TODO: rewrite file with every remaining image
    }

    @Override
    public void updateImage(String id, String title, String description, String tags, String owner) {
        List<Image> images = getAll();
        Image searchedImage = images.stream().filter(image -> Objects.equals(image.getId(), id))
                .findAny()
                .orElse(null);
        if (searchedImage != null) {
            searchedImage.setTitle(title);
            searchedImage.setDescription(description);
            searchedImage.setTags(tags);
        }
        //TODO: rewrite file with every image
    }


    @Override
    public byte[] getImageFile(String id) {
        List<Image> images = getAll();
        Image searchedImage = images.stream().filter(image -> Objects.equals(image.getId(), id))
                .findAny()
                .orElse(null);
        try {
            return Files.readAllBytes(Path.of("/src/imagedb/searchedImage.getTitle()" + "." + searchedImage.getExtension()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    //Recommended implementation. store data about users and images in csv files.
    //store the images in the same folder with image name like 41d6608d-0803-4239-9235-09f902fbf705.jpg

}
