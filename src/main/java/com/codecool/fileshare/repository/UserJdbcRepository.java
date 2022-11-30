package com.codecool.fileshare.repository;

import com.codecool.fileshare.exception.UserAlreadyExistsException;
import com.codecool.fileshare.model.AppUser;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class UserJdbcRepository implements UserRepository {
    static final String ADDRESS = System.getenv("ADDRESS");
    static final int PORT = Integer.parseInt(System.getenv("PORT"));
    static final String USERNAME = System.getenv("USERNAME");
    static final String PASSWORD = System.getenv("PASSWORD");

    static final String DB_NAME = "newimagedb";
    static final String DB_TYPE = "jdbc:postgresql";

    static final String DB_URL = DB_TYPE + "://" + ADDRESS + ":" + PORT + "/" + DB_NAME;

    @Override
    public AppUser findByUsername(String username) {
        final String SQL = "SELECT email, password FROM app_user WHERE email = ?;";

        try (Connection con = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD)) {
            PreparedStatement st = con.prepareStatement(SQL);
            st.setString(1, username);

            ResultSet rs = st.executeQuery();

            if (!rs.next()) {
                return null;
            }

            AppUser appUser = new AppUser();
            appUser.setEmail(rs.getString(1));
            appUser.setPassword(rs.getString(2));
            return appUser;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void save(AppUser appUser) throws UserAlreadyExistsException {
        final String SQL = "INSERT INTO app_user(email, password) VALUES (?,?);";

        try (Connection con = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD)) {
            PreparedStatement st = con.prepareStatement(SQL);
            st.setString(1, appUser.getEmail());
            st.setString(2, appUser.getPassword());

            st.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<AppUser> getAppUsers() {
        final String SQL = "SELECT email, password FROM app_user;";

        try (Connection con = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD)) {
            PreparedStatement st = con.prepareStatement(SQL);

            ResultSet rs = st.executeQuery();

            List<AppUser> appUsers = new ArrayList<>();

            while (rs.next()) {
                AppUser appUser = new AppUser();

                appUser.setEmail(rs.getString(1));
                appUser.setPassword(rs.getString(2));

                appUsers.add(appUser);
            }

            return appUsers;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
