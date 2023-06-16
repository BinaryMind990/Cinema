package com.cinema.support;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.cinema.model.Users;
import com.cinema.web.dto.UserDtoForAdminView;

@Component
public class UserToUserDtoForView implements Converter<Users, UserDtoForAdminView> {

	@Override
	
	public UserDtoForAdminView convert(Users source) {
		UserDtoForAdminView dto = new UserDtoForAdminView();
		dto.setId(source.getId());
		dto.setUsername(source.getUserName());
		dto.setUserRole(source.getRole().toString());
		dto.setRegistrationDateTime(getdateTimeStr(source.getRegistrationDateTime()));
		dto.seteMail(source.geteMail());
		
		return dto;
	}
	
	public  List<UserDtoForAdminView> convertAll (List<Users> users){
		List<UserDtoForAdminView> dtos = new ArrayList<UserDtoForAdminView>();
		
		for(Users user : users) {
			dtos.add(convert(user));
		}
		return dtos;
	}
		
	private String getdateTimeStr (LocalDateTime dateTime) throws DateTimeParseException{
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd.MM.yyyy.");
		String dateTimeStr = dtf.format(dateTime);
		return dateTimeStr;
	}

}
