package com.cinema.support;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import com.cinema.model.Projection;
import com.cinema.model.Seat;
import com.cinema.model.Ticket;
import com.cinema.service.ProjectionService;
import com.cinema.web.dto.TicketDTOCreate;

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
