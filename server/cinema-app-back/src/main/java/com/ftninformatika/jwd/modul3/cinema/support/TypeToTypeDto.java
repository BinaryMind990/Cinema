package com.ftninformatika.jwd.modul3.cinema.support;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import com.ftninformatika.jwd.modul3.cinema.model.Type;
import com.ftninformatika.jwd.modul3.cinema.web.dto.TypeDto;

@Component
public class TypeToTypeDto implements Converter<Type, TypeDto> {

	@Override
	public TypeDto convert(Type source) {
		
		TypeDto dto = new TypeDto();
		dto.setId(source.getId());
		dto.setName(source.getName());
		dto.setHallsId(source.getHalls().stream().map( h -> h.getId()).collect(Collectors.toList()));
		
		return dto;
	}
	
	public List<TypeDto> convertAll (List<Type> types){
		List<TypeDto> dtos = new ArrayList<TypeDto>();
		for(Type t : types) {
			dtos.add(convert(t));
		}
		return dtos;
	}
	

}
