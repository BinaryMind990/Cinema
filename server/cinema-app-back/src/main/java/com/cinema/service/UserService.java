package com.cinema.service;

import com.cinema.model.Users;
import com.cinema.web.dto.UserChangePasswordByAdminDto;
import com.cinema.web.dto.UserChangePasswordDTO;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<Users> findOne(Long id);

    List<Users> findAll();

    Page<Users> findAll(int pageNumber);

    Users save(Users user);
    
    Users update(Users user);

    Users delete(Long id);
    
    Optional<Users> findByEmail(String email);

    Optional<Users> findbyUserName(String userName);

    String changePassword(Long id, UserChangePasswordDTO userChangePasswordDto);
    
    boolean changePasswordByAdmin(Long id, UserChangePasswordByAdminDto dto);
    
    Users changeRole(Users user, String role);

	Page<Users> searchUsers(String userName, String role, String sortBy, String sort, int pageNo);
}
