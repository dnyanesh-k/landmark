package com.landmark.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.landmark.auth.dto.UserLoginDTO;
import com.landmark.auth.exception.UserDoesNotExist;
import com.landmark.auth.repository.AuthRepository;
import com.landmark.user.dto.UserResponseDTO;
import com.landmark.user.entity.User;
import com.landmark.user.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthRepository authRepository;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO login(UserLoginDTO loginDTO) {
        User user = authRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(
                        () -> new UserDoesNotExist("User does not exists with username " + loginDTO.getUsername()));

        if (!passwordEncoder.matches(loginDTO.getPasswordHash(), user.getPasswordHash()))
            ;

        return userMapper.toDTO(user);
    }

}
