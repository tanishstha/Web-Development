package com.example.stepelegance.Security;

import com.example.stepelegance.controller.Authentication.PasswordEncoderUtil;
import com.example.stepelegance.service.UserService;
import com.example.stepelegance.service.impl.UserDetailServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SpringSecurityConfig {

    private final UserDetailServiceImpl userDetailServiceImpl;
    private final JwtAuthenticationFilter jwtAuthFilter;
    @Value("${spring.web.resources.static-locations}")
    private String staticLocations;
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailServiceImpl);
        authenticationProvider.setPasswordEncoder(PasswordEncoderUtil.getInstance());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity httpSecurity)
            throws Exception {
        httpSecurity
                .csrf().disable()
                .authorizeHttpRequests()
                .anyRequest()
                .permitAll();


        return httpSecurity.build();
    }

}
