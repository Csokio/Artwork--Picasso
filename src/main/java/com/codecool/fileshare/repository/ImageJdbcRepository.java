package com.codecool.fileshare.repository;

import com.codecool.fileshare.exception.ImageAlreadyInDatabaseException;
import com.codecool.fileshare.model.Image;
import org.springframework.stereotype.Component;

import java.sql.*;
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

        final String SQL = "INSERT INTO image(title, description, owner, content, extension) VALUES (?, ?, ?, ?, ?) RETURNING id;";

        String uuid;

        try(Connection con = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD)) {
            PreparedStatement st = con.prepareStatement(SQL);
            st.setString(1, title);
            st.setString(2, description);
            st.setString(3, owner);
            st.setBytes(4, content);
            st.setString(5, extension);
            ResultSet rs = st.executeQuery();
            if (rs.next()){
                uuid = rs.getObject("id", java.util.UUID.class).toString();
            } else {
                throw new ImageAlreadyInDatabaseException("This image has already been saved");
            }
        } catch (SQLException e) {
            throw new RuntimeException(getClass().getSimpleName() + " " + SQL + ": " + e.getSQLState());
        }
        return uuid;
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

