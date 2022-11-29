package com.codecool.fileshare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageDataDTO {
    private String id;
    private String title;
    private String description;
    private String url;

}
