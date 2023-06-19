package com.cinema.support;

import com.cinema.model.Users;
import com.cinema.service.UserService;
import com.cinema.web.dto.UserDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

@Component
public class UserDTOToUser implements Converter<UserDTO, Users> {

    @Autowired
    private UserService userService;

    @Override
    public Users convert(UserDTO userDTO) {
        Users entity = null;

        if (userDTO.getId() == null) {
            entity = new Users();
        } else {
            Optional<Users> userOptional = userService.findOne(userDTO.getId());
            if (userOptional.isPresent()) {
                entity = userOptional.get();
            }
        }

        if (entity != null) {
            entity.setUserName(userDTO.getUserName().trim());
            entity.seteMail(userDTO.geteMail());
            entity.setName(userDTO.getName());
            entity.setLastName(userDTO.getLastName());
            entity.setDeleted(false);        
        }
        return entity;
    }

}
