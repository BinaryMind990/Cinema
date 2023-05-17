package com.ftninformatika.jwd.modul3.cinema.service.impl;

import com.ftninformatika.jwd.modul3.cinema.enumeration.UserRole;
import com.ftninformatika.jwd.modul3.cinema.model.Users;
import com.ftninformatika.jwd.modul3.cinema.repository.UserRepository;
import com.ftninformatika.jwd.modul3.cinema.service.UserService;
import com.ftninformatika.jwd.modul3.cinema.web.dto.UserChangePasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class JpaUserService implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Optional<Users> findOne(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<Users> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Page<Users> findAll(int pageNumber) {
        return userRepository.findAll(PageRequest.of(pageNumber, 10));
    }

    @Override
    public Users save(Users user) {
        user.setRole(UserRole.USER);
        return userRepository.save(user);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<Users> findbyUserName(String userName) {
        return userRepository.findFirstByUserName(userName);
    }

    @Override
    public boolean changePassword(Long id, UserChangePasswordDTO UserChangePasswordDto) {
        Optional<Users> result = userRepository.findById(id);

        if (!result.isPresent()) {
            throw new EntityNotFoundException();
        }

        Users user = result.get();

        boolean passwordsMatch = BCrypt.checkpw(UserChangePasswordDto.getOldPassword(), user.getPassword());
        if (!user.getUserName().equals(UserChangePasswordDto.getUserName()) || !passwordsMatch) {
            return false;
        }

        // dodatak za zadatak 2
        String password = UserChangePasswordDto.getPassword();
        if (!UserChangePasswordDto.getPassword().equals("")) {
            password = passwordEncoder.encode(UserChangePasswordDto.getPassword());
        }

        user.setPassword(password);

        userRepository.save(user);

        return true;
    }
}
