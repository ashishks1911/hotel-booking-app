package com.ashish.services;

import com.ashish.dto.UserDTO;

import java.util.List;

public interface UserService {

    void registerUser(UserDTO userDTO);

    List<UserDTO> getAllUsers();

    UserDTO getUserByEmail(String email);
}
