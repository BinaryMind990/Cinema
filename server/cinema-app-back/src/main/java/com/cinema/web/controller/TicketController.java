package com.cinema.web.controller;

import com.cinema.model.Projection;
import com.cinema.model.Ticket;
import com.cinema.model.Users;
import com.cinema.service.ProjectionService;
import com.cinema.service.TicketService;
import com.cinema.service.UserService;
import com.cinema.support.TicketToTicketDTO;
import com.cinema.support.TicketToTicketDtoForDispay;
import com.cinema.web.dto.TicketDTO;
import com.cinema.web.dto.TicketDTOCreate;
import com.cinema.web.dto.TicketDtoForDisplay;
import com.cinema.web.dto.TicketsListDtoCreate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/tickets")
@Validated
public class TicketController {

	@Autowired
	private TicketService ticketService;

	@Autowired
	private TicketToTicketDTO toDto;

	@Autowired
	private ProjectionService projectionService;

	@Autowired
	private TicketToTicketDtoForDispay toDtoForDisplay;

	@Autowired
	private UserService userService;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value = "/projection/{id}") 
	public ResponseEntity<List<TicketDtoForDisplay>> getByProjection(@PathVariable Long id) {
		Projection projection = projectionService.findOne(id);
		if(projection == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		List<Ticket> tickets = projection.getTickets();
	
		return new ResponseEntity<>(toDtoForDisplay.convertAll(tickets), HttpStatus.OK);
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@GetMapping(value = "/{id}")
	public ResponseEntity<TicketDTO> getOne(@PathVariable Long id) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String userName = auth.getName();

		Ticket ticket = ticketService.findOne(id);

		if(ticket == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
       
        if(auth.getAuthorities().toString().equals("[ROLE_USER]") && !userName.equals(ticket.getUser().getUserName())) { 	
        	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }  
        return new ResponseEntity<TicketDTO>(toDto.convert(ticket), HttpStatus.OK);

    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping(value = "/user/{id}")   
    public ResponseEntity<List<TicketDTO>> getByUser(@PathVariable Long id, 
    												 @RequestParam (required = false, defaultValue = "0") int pageNo){
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	String userName = auth.getName();

    	Optional<Users> user = userService.findOne(id);
    	if(!user.isPresent()) {
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	}
   
    	if(auth.getAuthorities().toString().equals("[ROLE_USER]") && !userName.equals(user.get().getUserName())) { 	
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	} 
    	
    	Page<Ticket> tickets = ticketService.findByUser(id, pageNo);
    	HttpHeaders headers = new HttpHeaders();
    	headers.add("Total-Pages", Integer.toString(tickets.getTotalPages()));
    	return new ResponseEntity<>(toDto.convertAll(tickets.getContent()), headers, HttpStatus.OK);	
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> create(@Valid @RequestBody TicketDTOCreate dto) {

    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	String userName = auth.getName();

    	String message = ticketService.save(dto, userName);
    	if (message.equals("success")) {
    		return new ResponseEntity<>("You buy ticket successfully", HttpStatus.CREATED);
    	}else {
    	return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    	}
    }
    
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping(value = "/buy", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createList(@Valid @RequestBody TicketsListDtoCreate dto){
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	String userName = auth.getName();
    	String message = ticketService.saveList(dto, userName);
    	if(message.equals("success")) {
    		return new ResponseEntity<>("You buy tickets successfully", HttpStatus.CREATED);
    	}else {
    		return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    	}
    	
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

    	Ticket deletedTicket = ticketService.delete(id);
    	if (deletedTicket == null)
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    	return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
