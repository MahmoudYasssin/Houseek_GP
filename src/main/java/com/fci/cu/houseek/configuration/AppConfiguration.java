package com.fci.cu.houseek.configuration;

import com.fci.cu.houseek.filters.JWTTokenGeneratorFilter;
import com.fci.cu.houseek.filters.JWTTokenValidatorFilter;
import lombok.AllArgsConstructor;
import org.apache.catalina.filters.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@AllArgsConstructor
public class AppConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf((a) -> a.disable())
                .cors((a) -> a.disable())
                .addFilterBefore(new JWTTokenValidatorFilter(), BasicAuthenticationFilter.class)
                .addFilterAfter(new JWTTokenGeneratorFilter(), BasicAuthenticationFilter.class)
                .authorizeHttpRequests(
                        authorize -> authorize
                                .requestMatchers("/apartment/sell/save").authenticated()
                                .requestMatchers("/apartment/sell/selectAll").authenticated()
                                .requestMatchers("/apartment/sell/search").authenticated()
                                //.requestMatchers("/User/signUp").permitAll()
                                .requestMatchers("/login").authenticated()
                                .requestMatchers("/signup").permitAll())
                .formLogin(withDefaults())
                .httpBasic(Customizer.withDefaults());
        return http.build();
        //   http
        //           .cors((a) -> a.disable())
        //           .csrf((a) -> a.disable());


       // return http.build();
    }


        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }


