package com.ashish.security.jwt;

import com.ashish.security.user.CustomUserDetails;
import com.ashish.security.user.CustomUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Value("${auth.token.jwtSecret}")
    private String jwtSecret;

    public String generateToken(Authentication authentication) {
        CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
        List<String> authorities = userPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", authorities);
        return Jwts.builder()
                .subject(userPrincipal.getEmail())
                .claims(claims)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(15)))
                .signWith(key(), Jwts.SIG.HS256)
                .compact();
    }

    private SecretKey key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }


    public boolean validateToken(String token) {
        try{
            Jwts.parser().verifyWith(key()).build().parseSignedClaims(token);
            return true;
        }catch(MalformedJwtException e){
            logger.error("Invalid jwt token : {} ", e.getMessage());
        }catch (ExpiredJwtException e){
            logger.error("Expired token : {} ", e.getMessage());
        }catch (UnsupportedJwtException e){
            logger.error("This token is not supported : {} ", e.getMessage());
        }catch (IllegalArgumentException e){
            logger.error("No  claims found : {} ", e.getMessage());
        }
        return false;
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }


    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload();
    }
}
