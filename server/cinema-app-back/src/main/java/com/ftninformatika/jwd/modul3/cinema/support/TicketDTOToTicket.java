package com.ftninformatika.jwd.modul3.cinema.support;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import com.ftninformatika.jwd.modul3.cinema.model.Projection;
import com.ftninformatika.jwd.modul3.cinema.model.Seat;
import com.ftninformatika.jwd.modul3.cinema.model.Ticket;
import com.ftninformatika.jwd.modul3.cinema.service.ProjectionService;
import com.ftninformatika.jwd.modul3.cinema.web.dto.TicketDTOCreate;

@Component
public class TicketDTOToTicket implements Converter<TicketDTOCreate, Ticket> {

	@Autowired
	private ProjectionService projectionService;

	@Override
	public Ticket convert(TicketDTOCreate dto) {
		Ticket newTicket = new Ticket();
		Projection projection = projectionService.findOne(dto.getProjectionId());
		Seat seat = new Seat(dto.getSeatNumber(), projection.getHall());

		newTicket.setDateAndTime(LocalDateTime.now());
		newTicket.setProjection(projectionService.findOne(dto.getProjectionId()));
		newTicket.setSeat(seat);

		return newTicket;
	}

}
