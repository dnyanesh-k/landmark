package com.landmark.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.landmark.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    public boolean existsByEmail(String email);

    Optional<User> findByUsername(String email);

    Optional<User> findById(Long id);

}
