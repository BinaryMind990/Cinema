package com.cinema.service.impl;

import com.cinema.enumeration.UserRole;
import com.cinema.model.Users;
import com.cinema.repository.UserRepository;
import com.cinema.service.UserService;
import com.cinema.web.dto.UserChangePasswordDTO;
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
        return userRepository.findByDeleted(false);
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
    public Users delete(Long id) {
        Optional<Users> userOptional = userRepository.findById(id);
        if (userOptional.isPresent() && userOptional.get().getTickets().isEmpty()) {
            userRepository.deleteById(id);
            return userOptional.get();
        }
        if(userOptional.isPresent() && !userOptional.get().getTickets().isEmpty()) {
        	userOptional.get().setDeleted(true);
        	return userRepository.save(userOptional.get());
        }
        
      return null;
    }

    @Override
    public Optional<Users> findbyUserName(String userName) {
        return userRepository.findFirstByUserName(userName);
    }

    @Override
    public boolean changePassword(Long id, UserChangePasswordDTO userChangePasswordDTO) {
        Optional<Users> result = userRepository.findById(id);

        if (!result.isPresent()) {
            throw new EntityNotFoundException();
        }

        Users user = result.get();

        boolean passwordsMatch = BCrypt.checkpw(userChangePasswordDTO.getOldPassword(), user.getPassword());
        if (!user.getUserName().equals(userChangePasswordDTO.getUserName()) || !passwordsMatch) {
            return false;
        }

        String password = userChangePasswordDTO.getPassword();
        if (!userChangePasswordDTO.getPassword().equals("")) {
            password = passwordEncoder.encode(userChangePasswordDTO.getPassword());
        }

        user.setPassword(password);

        userRepository.save(user);

        return true;
    }

	@Override
	public Users changeRole(Users user, String role) {
		if(role.equals("USER") || role.equals("ADMIN")) {
			user.setRole(UserRole.valueOf(role));
			Users changedUser = userRepository.save(user);
			return changedUser;
		}
	
		return null;
	}
}