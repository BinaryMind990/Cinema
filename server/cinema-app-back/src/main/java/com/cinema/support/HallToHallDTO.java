package com.cinema.support;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import com.cinema.model.Hall;
import com.cinema.web.dto.HallDTO;

@Component
public class HallToHallDTO implements Converter<Hall, HallDTO> {

	@Override
	public HallDTO convert(Hall source) {

		HallDTO dto = new HallDTO();
		dto.setId(source.getId());
		dto.setName(source.getName());
		dto.setTypesId(source.getTypes().stream().map(t -> t.getId()).collect(Collectors.toList()));
		dto.setSeats(source.getSeats().stream().map(s -> s.getSeatNumber()).collect(Collectors.toList()));
		return dto;
	}

	public List<HallDTO> convertAll(List<Hall> halls) {
		List<HallDTO> dtos = new ArrayList<HallDTO>();

		for (Hall h : halls) {
			dtos.add(convert(h));
		}
		return dtos;
	}
}
