package com.fci.cu.houseek.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((a) -> a.disable())
                .cors((a) -> a.disable())

                .exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint)
                .and()
                .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
                .authorizeHttpRequests((requests) -> requests
                       // .requestMatchers("/print").authenticated()
                        .requestMatchers("/apartment/sell/save").authenticated()
                        .requestMatchers("/apartment/sell/FavouriteList").permitAll()
                        .requestMatchers("/apartment/sell/sellectAllfavouriteApartment").authenticated()
                        .requestMatchers("/apartment/sell/howManyApartmentExistInFav").authenticated()
                        .requestMatchers("/apartment/sell/numOfApartmentViews").permitAll()
                        .requestMatchers("/apartment/sell/editApartmentStatus").permitAll()
                       // .requestMatchers("/apartment/sell/findMostApartmentFreq").permitAll()
                        .requestMatchers("/userApartments").authenticated()
                        .requestMatchers("/apartment/sell/search").permitAll()
                        .requestMatchers("/apartment/sell/selectAll").permitAll()
                        .requestMatchers("/apartment/sell/selectAllForDash").permitAll()
                        .requestMatchers("/edit").authenticated()
                        .requestMatchers(HttpMethod.POST, "/login", "/register").permitAll()
                      //  .requestMatchers(HttpMethod.GET, "/print", "").authenticated()

                        .requestMatchers("/dashboard/sendMessage").permitAll()
                       .requestMatchers("/dashboard/showMessages").authenticated()
                       .requestMatchers("/dashboard/editMessageStatus").authenticated()
                       .requestMatchers("/dashboard/showWhoAddMyApartmentToFavList").permitAll()
                       .requestMatchers("/dashboard/showWhoViewMyApartment").permitAll()


                        .anyRequest().authenticated())
        ;
        return http.build();
    }
}
