package com.codecool.fileshare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageUpdateDTO {
    private String title;
    private String description;
    private String tags;
}
