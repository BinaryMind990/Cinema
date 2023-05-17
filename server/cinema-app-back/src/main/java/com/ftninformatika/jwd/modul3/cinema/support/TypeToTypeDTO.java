package com.ftninformatika.jwd.modul3.cinema.support;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import com.ftninformatika.jwd.modul3.cinema.model.Type;
import com.ftninformatika.jwd.modul3.cinema.web.dto.TypeDTO;

@Component
public class TypeToTypeDTO implements Converter<Type, TypeDTO> {

	@Override
	public TypeDTO convert(Type source) {

		TypeDTO dto = new TypeDTO();
		dto.setId(source.getId());
		dto.setName(source.getName());
		dto.setHallsId(source.getHalls().stream().map(h -> h.getId()).collect(Collectors.toList()));

		return dto;
	}

	public List<TypeDTO> convertAll(List<Type> types) {
		List<TypeDTO> dtos = new ArrayList<TypeDTO>();
		for (Type t : types) {
			dtos.add(convert(t));
		}
		return dtos;
	}

}
