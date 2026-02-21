package com.fleetflow.controller;

import com.fleetflow.dto.LoginRequest;
import com.fleetflow.dto.LoginResponse;
import com.fleetflow.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );

        String role = authentication.getAuthorities()
                .iterator()
                .next()
                .getAuthority();

        String token = jwtUtil.generateToken(
                request.getUsername(),
                role
        );

        return LoginResponse.builder()
                .token(token)
                .role(role)
                .build();
    }
}