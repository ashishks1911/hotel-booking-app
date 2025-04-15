package com.ashish.security.user;

import com.ashish.models.User;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
public class CustomUserDetails implements UserDetails {
    private Long id;
    private String email;
    private String password;
    private Collection<GrantedAuthority> authorities;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    public static CustomUserDetails buildUserDetails(User user){
        List<GrantedAuthority> authorityList = user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRole().name()))
                .collect(Collectors.toList());

        return CustomUserDetails.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .authorities(authorityList)
                .build();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

}
