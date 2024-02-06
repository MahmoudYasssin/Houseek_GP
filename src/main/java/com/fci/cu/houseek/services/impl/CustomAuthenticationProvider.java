/*
package com.fci.cu.houseek.services.impl;

import com.fci.cu.houseek.constants.SecurityConstants;
import com.fci.cu.houseek.models.Authority;
import com.fci.cu.houseek.models.User;
import com.fci.cu.houseek.repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;


    //login(userName / password)
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String username = authentication.getName();
        String pwd = authentication.getCredentials().toString();
        User user = userRepository.findUserByUsername(username);

        //added new
        if(user!= null)
        {
            if (passwordEncoder.matches(pwd, user.getPassword())) {
                return new UsernamePasswordAuthenticationToken(username, pwd, getGrantedAuthority(user.getAuthorities()));
            }
        }

        return null;
    }

    public List<GrantedAuthority> getGrantedAuthority(List<Authority> authority) {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (Authority authority1 : authority)
            grantedAuthorities.add(new SimpleGrantedAuthority(authority1.getName()));
        return grantedAuthorities;

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));

    }

    public String generateTokenForUser(User user) {
        SecretKey key = Keys.hmacShaKeyFor(SecurityConstants.JWT_KEY.getBytes(StandardCharsets.UTF_8));
        String jwt = Jwts.builder()
                .setIssuer("Mahmoud Yassin Issuser")
                .setSubject("Mahmoud Yassin ")
                .claim("username", user.getUserName())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 30000000))
                .signWith(key).compact();
        return jwt;
    }


}

 */