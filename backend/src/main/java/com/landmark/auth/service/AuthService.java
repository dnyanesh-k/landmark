package com.landmark.auth.service;

import com.landmark.auth.dto.UserLoginDTO;
import com.landmark.user.dto.UserResponseDTO;

public interface AuthService {
    public UserResponseDTO login(UserLoginDTO loginDTO);
}
