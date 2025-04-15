package com.ashish.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder
public class UserDTO {
    private Long id;
    @NotBlank(message = "Firstname cannot be black")
    private String firstName;
    @NotBlank(message = "Lastname cannot be black")
    private String lastName;
    @Email(message = "Invalid Email")
    @NotBlank(message = "Email cannot be black")
    private String email;
    private Set<String> roles;
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 5, max = 20, message = "Password must be between 5 and 20 characters")
    private String password;
}
