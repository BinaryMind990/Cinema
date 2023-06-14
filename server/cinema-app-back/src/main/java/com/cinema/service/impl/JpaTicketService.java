package com.cinema.service.impl;

import com.cinema.model.Projection;
import com.cinema.model.Ticket;
import com.cinema.model.Users;
import com.cinema.repository.TicketRep;
import com.cinema.service.ProjectionService;
import com.cinema.service.TicketService;
import com.cinema.service.UserService;
import com.cinema.support.TicketDTOToTicket;
import com.cinema.web.dto.TicketDTOCreate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
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

	@Autowired
	private UserService userService;

	@Override
	public List<Ticket> findAll() {
		return ticketRep.findAll();
	}

	@Override
	public Ticket findOne(Long id) {
		return ticketRep.getOne(id);
	}

	@Override
	public Ticket save(TicketDTOCreate dto, String userName) {
		Projection projection = projectionService.findOne(dto.getProjectionId());
		if (projection == null)
			return null;
		if (projection.getDateAndTime().isBefore(LocalDateTime.now()))
			return null;
		if (projection.getHall().getSeats().size() < dto.getSeatNumber())
			return null;

		if (projection.getTickets().stream().map(t -> t.getSeat().getSeatNumber()).collect(Collectors.toList())
				.contains(dto.getSeatNumber()))
			return null;
		Users user = userService.findbyUserName(userName).get();

		Ticket ticket = toTicket.convert(dto);
		ticket.setUser(user);
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
