package com.ftninformatika.jwd.modul3.cinema.support;

import com.ftninformatika.jwd.modul3.cinema.model.Projection;
import com.ftninformatika.jwd.modul3.cinema.web.dto.ProjectionDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ProjectionToProjectionDTO implements Converter<Projection, ProjectionDTO> {

    @Override
    public ProjectionDTO convert(Projection projection) {
    	ProjectionDTO dto = new ProjectionDTO();
    	dto.setId(projection.getId());
    	dto.setMovieId(projection.getMovie().getId());
    	dto.setMovieName(projection.getMovie().getName());
    	dto.setDateTimeStr(projection.getDateAndTime().toString());
    	dto.setHall(projection.getHall().getName());
    	dto.setHallId(projection.getHall().getId());
    	dto.setTicketPrice(projection.getTicketPrice());
    	dto.setTypeId(projection.getType().getId());
    	dto.setTypeName(projection.getType().getName());
    	dto.setFreeSeats(projection.freeSeats());
    	Set<Long> seats = projection.getHall().getSeats().stream().map(s -> s.getSeatNumber()).collect(Collectors.toSet());
    	for(Long l : projection.getTickets().stream().map(t -> t.getSeat().getSeatNumber()).collect(Collectors.toList())) {
    		seats.remove(l);
    	}
    	dto.setSeats(seats);
    	
        return dto;
    }

    public List<ProjectionDTO> convertAll(List<Projection> projections){
        List<ProjectionDTO> dtos = new ArrayList<>();
        for(Projection m: projections){
            dtos.add(convert(m));
        }
        return dtos;
    }
}