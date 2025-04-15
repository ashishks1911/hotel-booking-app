package com.ashish.dto;

import com.ashish.models.Role;

import java.util.List;
import java.util.Set;
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
