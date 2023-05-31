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

import org.springframework.beans.factory.annotation.Autowired;
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
    
    @GetMapping(value = "/projection/{id}") //metoda vraca prodate karte za odabranu projekciju koje moze da vidi samo admin
    public ResponseEntity<List<TicketDtoForDisplay>> getByProjection(@PathVariable Long id) {
    	Projection projection = projectionService.findOne(id);
    	if(projection == null) {
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	}
    	List<Ticket> tickets = projection.getTickets();
    	
    //    List<Ticket> tickets = ticketService.findAll();
        return new ResponseEntity<>(toDtoForDisplay.convertAll(tickets), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TicketDTO> getOne(@PathVariable Long id) {
        Ticket ticket = ticketService.findOne(id);
        if (ticket != null) {
            return new ResponseEntity<TicketDTO>(toDto.convert(ticket), HttpStatus.OK);
        } else {
            return new ResponseEntity<TicketDTO>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/user/{id}")   //ova metoda vraca karte za korisnika
    public ResponseEntity<List<TicketDtoForDisplay>> getByUser(@PathVariable Long id){
    	Optional<Users> user = userService.findOne(id);
    	if(!user.isPresent()) {
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	}
    	
    	List<Ticket> tickets = user.get().getTickets();
    	return new ResponseEntity<>(toDtoForDisplay.convertAll(tickets), HttpStatus.OK);
    	
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TicketDTO> create(@Valid @RequestBody TicketDTOCreate dto) {
    
    		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    		String userName = auth.getName();
    		System.out.println(userName);
    	
        Ticket savedTicket = ticketService.save(dto, userName);
        if (savedTicket == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(toDto.convert(savedTicket), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        System.out.println(id);
        Ticket deletedTicket = ticketService.delete(id);
        if (deletedTicket == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}