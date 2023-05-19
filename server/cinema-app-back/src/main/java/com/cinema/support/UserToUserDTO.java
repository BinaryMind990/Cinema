package com.cinema.support;

import com.cinema.model.Users;
import com.cinema.web.dto.UserDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserToUserDTO implements Converter<Users, UserDTO> {

    @Override
    public UserDTO convert(Users user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.seteMail(user.geteMail());
        userDTO.setName(user.getName());
        userDTO.setLastName(user.getLastName());
        userDTO.setUserName(user.getUserName());

        return userDTO;
    }

    public List<UserDTO> convert(List<Users> users) {
        List<UserDTO> userDTOS = new ArrayList<>();

        for (Users u : users) {
            UserDTO dto = convert(u);
            userDTOS.add(dto);
        }

        return userDTOS;
    }
}
