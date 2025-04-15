package com.ashish.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class JwtResponse {
    private Long id;
    private String email;
    private String jwt;
    private List<String> roles;

    public JwtResponse(Long id, String email, String jwt, List<String> roles) {
        this.id = id;
        this.email = email;
        this.jwt = jwt;
        this.roles = roles;
    }
}
