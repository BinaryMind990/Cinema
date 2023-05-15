package com.ftninformatika.jwd.modul3.cinema.support;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import com.ftninformatika.jwd.modul3.cinema.model.Hall;
import com.ftninformatika.jwd.modul3.cinema.web.dto.HallDto;

@Component
public class HallToHallDto implements Converter<Hall, HallDto> {

	@Override
	public HallDto convert(Hall source) {
		
		HallDto dto = new HallDto();
		dto.setId(source.getId());
		dto.setName(source.getName());
		dto.setTypesId(source.getTypes().stream().map(t -> t.getId()).collect(Collectors.toList()));
		dto.setSeats(source.getSeats().stream().map(s -> s.getSeatNumber()).collect(Collectors.toList()));
		return dto;
	}
	
	public List<HallDto> convertAll(List<Hall> halls){
		List<HallDto> dtos = new ArrayList<HallDto>();
		
		for(Hall h : halls) {
			dtos.add(convert(h));
		}
		return dtos;
	}
}
