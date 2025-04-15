package com.ashish.factories;

import com.ashish.ERole;
import com.ashish.exception.RoleNotFoundException;
import com.ashish.models.Role;
import com.ashish.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleFactory {
    @Autowired
    RoleRepository roleRepository;

    public Role getInstance(String role) throws RoleNotFoundException {
        switch (role) {
            case "admin" -> {
                return roleRepository.findByRole(ERole.ROLE_ADMIN);
            }
            case "user" -> {
                return roleRepository.findByRole(ERole.ROLE_USER);
            }
            case "super_admin" -> {
                return roleRepository.findByRole(ERole.ROLE_SUPER_ADMIN);
            }
            default -> throw new RoleNotFoundException("No role found for " +  role);
        }
    }

}