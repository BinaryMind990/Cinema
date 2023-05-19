package com.cinema.service;

import com.cinema.model.Users;
import com.cinema.web.dto.UserChangePasswordDTO;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<Users> findOne(Long id);

    List<Users> findAll();

    Page<Users> findAll(int pageNumber);

    Users save(Users user);

    void delete(Long id);

    Optional<Users> findbyUserName(String userName);

    boolean changePassword(Long id, UserChangePasswordDTO userChangePasswordDto);
}
