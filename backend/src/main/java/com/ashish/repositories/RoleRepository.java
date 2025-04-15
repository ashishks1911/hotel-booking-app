package com.ashish.repositories;

import com.ashish.ERole;
import com.ashish.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRole(ERole role);
}
