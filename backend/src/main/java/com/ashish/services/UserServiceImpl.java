package com.ashish.services;

import com.ashish.dto.UserDTO;
import com.ashish.exception.InvalidInputException;
import com.ashish.models.User;
import com.ashish.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void registerUser(UserDTO userDTO) {
        if(userRepository.existsByEmail(userDTO.getEmail())){
            throw new InvalidInputException(String.format("User with the email address '%s' already Exists", userDTO.getEmail()));
        }
        User user = User.builder().email(userDTO.getEmail())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .createdOn(LocalDate.now())
                .build();
        userRepository.save(user);

    }


}
