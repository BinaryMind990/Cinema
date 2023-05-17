package com.ftninformatika.jwd.modul3.cinema.service.impl;

import com.ftninformatika.jwd.modul3.cinema.model.Projection;
import com.ftninformatika.jwd.modul3.cinema.model.Ticket;
import com.ftninformatika.jwd.modul3.cinema.repository.TicketRep;
import com.ftninformatika.jwd.modul3.cinema.service.ProjectionService;
import com.ftninformatika.jwd.modul3.cinema.service.TicketService;
import com.ftninformatika.jwd.modul3.cinema.support.TicketDTOToTicket;
import com.ftninformatika.jwd.modul3.cinema.web.dto.TicketDTOCreate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JpaTicketService implements TicketService {

	@Autowired
	private TicketRep ticketRep;

	@Autowired
	private TicketDTOToTicket toTicket;

	@Autowired
	private ProjectionService projectionService;

	@Override
	public List<Ticket> findAll() {
		return ticketRep.findAll();
	}

	@Override
	public Ticket findOne(Long id) {
		return ticketRep.getOne(id);
	}

	@Override
	public Ticket save(TicketDTOCreate dto) {
		Projection projection = projectionService.findOne(dto.getProjectionId());
		if (projection == null)
			return null;
		if (projection.getDateAndTime().isBefore(LocalDateTime.now()))
			return null;
		if (projection.getHall().getSeats().size() < dto.getSeatNumber())
			return null;
		System.out.println(projection.getHall().getSeats().size());

		if (projection.getTickets().stream().map(t -> t.getSeat().getSeatNumber()).collect(Collectors.toList())
				.contains(dto.getSeatNumber()))
			return null;

		Ticket ticket = toTicket.convert(dto);

		return ticketRep.save(ticket);
	}

	@Override
	public Ticket delete(Long id) {
		Optional<Ticket> ticket = ticketRep.findById(id);

		if (!ticket.isPresent())
			return null;
		if (ticket.get().getProjection().getDateAndTime().isBefore(LocalDateTime.now()))
			return null;

		ticketRep.delete(ticket.get());
		return ticket.get();
	}

}
