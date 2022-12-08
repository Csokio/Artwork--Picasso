package com.codecool.fileshare.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class Image {

    private String id;
    private String title;
    private String description;
    private String tags;
    private String extension;
    private String content;

}
