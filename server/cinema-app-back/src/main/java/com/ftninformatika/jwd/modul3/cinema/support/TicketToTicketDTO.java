package com.ftninformatika.jwd.modul3.cinema.support;

import com.ftninformatika.jwd.modul3.cinema.model.Ticket;
import com.ftninformatika.jwd.modul3.cinema.web.dto.TicketDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TicketToTicketDTO implements Converter<Ticket, TicketDTO> {
    @Override
    public TicketDTO convert(Ticket source) {
        TicketDTO dto = new TicketDTO();
        
        String [] dateTime = source.getProjection().getDateAndTime().toString().split("T");
        dto.setId(source.getId());
        dto.setMovieName(source.getProjection().getMovie().getName());
        dto.setDate(dateTime[0]);
        dto.setTime(dateTime[1]);
        dto.setHall(source.getProjection().getHall().getName());
        dto.setMovieName(source.getProjection().getMovie().getName());
        dto.setType(source.getProjection().getType().getName());
        dto.setSeat(source.getSeat().getSeatNumber());
        dto.setPrice(source.getProjection().getTicketPrice());
        
        return dto;
    }

    public List<TicketDTO> convertAll(List<Ticket> tickets){
        List<TicketDTO> dtos = new ArrayList<>();
        for(Ticket t: tickets){
            dtos.add(convert(t));
        }
            return dtos;
    }
}
