package com.ashish.services;

import com.ashish.dto.UserDTO;
import com.ashish.exception.InvalidInputException;
import com.ashish.factories.RoleFactory;
import com.ashish.models.Role;
import com.ashish.models.User;
import com.ashish.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    @Autowired
    private RoleFactory roleFactory;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void registerUser(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new InvalidInputException(String.format("User with the email address '%s' already Exists", userDTO.getEmail()));
        }
        User user = User.builder().email(userDTO.getEmail())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .roles(getRoles(userDTO.getRoles()))
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .createdOn(LocalDate.now())
                .build();
        userRepository.save(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOS = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = fromUserToUserDTO(user);
            userDTOS.add(userDTO);
        }
        return userDTOS;
    }

    private UserDTO fromUserToUserDTO(User user) {
        return UserDTO.builder().id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .roles(user.getRoles().stream().map(role -> role.getRole().name()).collect(Collectors.toSet()))
                .build();
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("User not found with email "+ email));
        return fromUserToUserDTO(user);
    }

    private Set<Role> getRoles(Set<String> strRoles) {
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            roles.add(roleFactory.getInstance("user"));
        } else {
            for (String role : strRoles) {
                roles.add(roleFactory.getInstance(role));
            }
        }
        return roles;
    }


}
