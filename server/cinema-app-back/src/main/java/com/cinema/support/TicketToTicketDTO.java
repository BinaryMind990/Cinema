package com.cinema.support;

import com.cinema.model.Ticket;
import com.cinema.web.dto.TicketDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class TicketToTicketDTO implements Converter<Ticket, TicketDTO> {
    @Override
    public TicketDTO convert(Ticket source) {
        TicketDTO dto = new TicketDTO();
        System.out.println(source);
        String[] dateTime = getDateTimeStr(source.getProjection().getDateAndTime()).split(" ");
        
        dto.setId(source.getId());
        dto.setMovieName(source.getProjection().getMovie().getName());
        dto.setProjectionDate(dateTime[0]);
        dto.setProjectionTime(dateTime[1]);
        dto.setHall(source.getProjection().getHall().getName());
        dto.setMovieName(source.getProjection().getMovie().getName());
        dto.setType(source.getProjection().getType().getName());
        dto.setSeat(source.getSeat().getSeatNumber());
        dto.setPrice(source.getProjection().getTicketPrice());
        String [] dateTimeTicket = getDateTimeStr(source.getDateAndTime()).split(" ");
        dto.setTicketBuyDate(dateTimeTicket[0]);
        dto.setTicketBuyTime(dateTimeTicket[1]);
        dto.setProjectionId(source.getProjection().getId());
        
        return dto;
    }

    public List<TicketDTO> convertAll(List<Ticket> tickets) {
        List<TicketDTO> dtos = new ArrayList<>();
        for (Ticket t : tickets) {
            dtos.add(convert(t));
        }
        return dtos;
    }
    
    private String getDateTimeStr (LocalDateTime dateTime) {
    	DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd.MM.yyyy. HH:mm");
    	String dateTimeStr = dtf.format(dateTime);
    	return dateTimeStr;
    }
}
