package com.codecool.fileshare.repository;

import com.codecool.fileshare.exception.ImageAlreadyInDatabaseException;
import com.codecool.fileshare.model.Image;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component("jdbc")
public class ImageJdbcRepository implements ImageRepository {

    static final String ADDRESS = System.getenv("host");
    static final int PORT = Integer.parseInt(System.getenv("port"));
    static final String USERNAME = System.getenv("dbuser");
    static final String PASSWORD = System.getenv("dbpassword");

    static final String DB_NAME = System.getenv("dbname");
    static final String DB_TYPE = "jdbc:postgresql";

    static final String DB_URL = DB_TYPE + "://" + ADDRESS + ":" + PORT + "/" + DB_NAME;


    @Override
    public String storeImageFile(String title, String description, String owner, byte[] content, String extension, String tags) {

        final String SQL = "INSERT INTO image(title, description, owner, content, extension, tags) VALUES (?, ?, ?, ?, ?, ?) RETURNING id;";

        UUID uuid;

        try(Connection con = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD)) {
            PreparedStatement st = con.prepareStatement(SQL);
            st.setString(1, title);
            st.setString(2, description);
            st.setString(3, owner);
            st.setBytes(4, content);
            st.setString(5, extension);
            st.setString(6, tags);
            ResultSet rs = st.executeQuery();
            if (rs.next()){
                uuid = rs.getObject("id", java.util.UUID.class);
            } else {
                throw new ImageAlreadyInDatabaseException("This image has already been saved");
            }
        } catch (SQLException e) {
            throw new RuntimeException(getClass().getSimpleName() + " " + SQL + ": " + e.getSQLState());
        }
        return uuid.toString();
    }

    @Override
    public boolean checkOwner(String owner, String id) {

        String SQL = "SELECT ? " +
                "FROM image  " +
                "WHERE owner = ?;";

        try (Connection con = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD)) {
            PreparedStatement st = con.prepareStatement(SQL);
            st.setString(1, id);
            st.setString(2, owner);
            ResultSet rs = st.executeQuery();
            if (rs.next()) return true;
        } catch (SQLException e) {
            throw new RuntimeException(getClass().getSimpleName() + " " + SQL + ": " + e.getSQLState());
        }
        return false;
    }

    @Override
    public List<Image> getAll(String owner) {
        List<Image> imageList = new ArrayList<>();

        String SQL = "SELECT id, title, description, content, tags, extension FROM image WHERE owner = ?;";

        try (Connection con = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD)) {
            PreparedStatement ps = con.prepareStatement(SQL);
            ps.setString(1, owner);
            ResultSet rs = ps.executeQuery();
            Image image;
            while (rs.next()) {
                image = new Image(
                        rs.getObject("id", UUID.class).toString(),
                        rs.getString("title"),
                        rs.getString("description"),
                        rs.getString("tags"),
                        rs.getString("extension")
                );
                imageList.add(image);
            }
        } catch (SQLException sqle) {
            throw new RuntimeException(getClass().getSimpleName() + " " + SQL + ": " + sqle.getSQLState());
        }
        return imageList;
    }

    @Override
    public void delete(String uuid, String owner) {
        String SQL = "DELETE FROM image WHERE id::text = ? AND owner = ?;";
        try (Connection con = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD)) {
            PreparedStatement pt = con.prepareStatement(SQL);
            pt.setString(1, uuid);
            pt.setString(2, owner);
            pt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(getClass().getSimpleName() + " " + SQL + ": " + e.getSQLState());
        }
    }

    @Override
    public void updateImage(String id, String title, String description, String tags, String owner) {
        String SQL = "UPDATE image SET title = ?, description = ?, tags = ? WHERE id::text = ?;";

        try(Connection con = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD)){
            PreparedStatement st = con.prepareStatement(SQL);
            st.setString(1, title);
            st.setString(2, description);
            st.setString(3, tags);
            st.setString(4, id);

            st.executeUpdate();  //here we can have problem with already existing id- TODO: check if we catch this type of error
        } catch (SQLException e) {
            throw new RuntimeException(getClass().getSimpleName() + " " + SQL + ": " + e.getSQLState());
        }
    }

    @Override
    public byte[] getImageFile(String id) {
        String uuid = id.split("\\.")[0];
        byte[] bytearray = null;
        String SQL = "SELECT content FROM image WHERE id::text = ?;";
        try(Connection con = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD)) {
            PreparedStatement st = con.prepareStatement(SQL);
            st.setString(1,uuid);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                bytearray = rs.getBytes(1);
            }
            return bytearray;

        } catch (SQLException e) {
            throw new RuntimeException(getClass().getSimpleName() + " " + SQL + ": " + e.getSQLState());
        }
    }
}

