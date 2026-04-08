package com.krisztavasas.db_library.config;

import com.krisztavasas.db_library.enums.UserRole;
import com.krisztavasas.db_library.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/books/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/genres/**").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()

                        .requestMatchers("/api/manager/**").hasAnyRole(UserRole.MANAGER.name(), UserRole.ADMIN.name())
                        .requestMatchers(HttpMethod.POST, "/api/books/**").hasAnyRole(UserRole.MANAGER.name(), UserRole.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/books/**").hasAnyRole(UserRole.MANAGER.name(), UserRole.ADMIN.name())
                        .requestMatchers(HttpMethod.PATCH, "/api/books/**").hasAnyRole(UserRole.MANAGER.name(), UserRole.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/books/**").hasAnyRole(UserRole.MANAGER.name(), UserRole.ADMIN.name())
                        .requestMatchers(HttpMethod.POST, "/api/genres/**").hasAnyRole(UserRole.MANAGER.name(), UserRole.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/genres/**").hasAnyRole(UserRole.MANAGER.name(), UserRole.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/genres/**").hasAnyRole(UserRole.MANAGER.name(), UserRole.ADMIN.name())

                        .requestMatchers("/api/users/me/**").hasAnyRole(UserRole.USER.name(), UserRole.MANAGER.name(), UserRole.ADMIN.name())
                        .requestMatchers("/api/orders/**").hasAnyRole(UserRole.USER.name(), UserRole.MANAGER.name(), UserRole.ADMIN.name())

                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
