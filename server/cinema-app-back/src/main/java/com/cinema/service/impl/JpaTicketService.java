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
import com.cinema.web.dto.TicketsListDtoCreate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
	public String save(TicketDTOCreate dto, String userName) {
		Projection projection = projectionService.findOne(dto.getProjectionId());
		if (projection == null)
			return "Projection doesn't exist";
		if (projection.getDateAndTime().isBefore(LocalDateTime.now()))
			return "Projection already started";
		if (projection.getHall().getSeats().size() < dto.getSeatNumber())
			return "Chosen seat doesn't exist";
		

		if (projection.getTickets().stream().map(t -> t.getSeat().getSeatNumber()).collect(Collectors.toList())
				.contains(dto.getSeatNumber()))
			return "Ticket has been sold";
		Users user = userService.findbyUserName(userName).get();
		
		
		Ticket ticket = toTicket.convert(dto);
		ticket.setUser(user);
		
		Ticket savedTticket = ticketRep.save(ticket);
		if(savedTticket == null) {
			return "Ticket is not saved";
		}
		
		return "success";
	}

	@Override
	public String saveList(TicketsListDtoCreate dto, String userName) {
		Projection projection = projectionService.findOne(dto.getProjectionId());
		if(projection == null)
			return "Projection doesn't exist";
		if(projection.getDateAndTime().isBefore(LocalDateTime.now()))
			return "Projection already started";
		if(dto.getSeatNumbers().stream().anyMatch(s ->s <1 || s > projection.getHall().getSeats().size()))
			return "Some chosen seat doesn't exist in this hall";
		List<Long> chosenSeats = dto.getSeatNumbers();
		List<Long> soldSeats = projection.getTickets().stream().map(t -> t.getSeat().getSeatNumber()).collect(Collectors.toList());

		List<Long> list = soldSeats.stream().filter(cs -> chosenSeats.stream().anyMatch(ss -> ss == cs)).collect(Collectors.toList());
		list.forEach(t -> System.out.println(t));
		Users user = userService.findbyUserName(userName).get();
		if(!list.isEmpty()) {
			return "Some chosen seat is no more available";
		}else {
			for(Long t : dto.getSeatNumbers()) {
				TicketDTOCreate ticketDto = new TicketDTOCreate(dto.getProjectionId(), t);
				Ticket ticket = toTicket.convert(ticketDto);
				ticket.setUser(user);
				ticketRep.save(ticket);
			}
		}
		return "success";
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

	@Override
	public Page<Ticket> findByUser(Long id, int pageNo) {
		
		return ticketRep.findByUser(id, PageRequest.of(pageNo, 10));	
	}

}
