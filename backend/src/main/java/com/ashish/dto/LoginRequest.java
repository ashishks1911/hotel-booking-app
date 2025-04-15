package com.ashish.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {
    @Email(message = "Invalid Email")
    @NotBlank(message = "Email cannot be black")
    private String email;
    @NotBlank
    private String password;
}
