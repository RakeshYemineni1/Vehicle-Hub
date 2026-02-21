package com.fleetflow.config;

import com.fleetflow.entity.Role;
import com.fleetflow.entity.User;
import com.fleetflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        createUserIfNotExists("manager", "password123", Role.FLEET_MANAGER);
        createUserIfNotExists("dispatcher", "password123", Role.DISPATCHER);
        createUserIfNotExists("safety", "password123", Role.SAFETY_OFFICER);
        createUserIfNotExists("finance", "password123", Role.FINANCIAL_ANALYST);
    }

    private void createUserIfNotExists(String username,
                                       String rawPassword,
                                       Role role) {

        if (userRepository.findByUsername(username).isEmpty()) {

            User user = User.builder()
                    .username(username)
                    .password(passwordEncoder.encode(rawPassword))
                    .role(role)
                    .active(true)
                    .build();

            userRepository.save(user);
        }
    }
}