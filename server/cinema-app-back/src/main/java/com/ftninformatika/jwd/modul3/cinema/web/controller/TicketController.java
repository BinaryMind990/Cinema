package com.ftninformatika.jwd.modul3.cinema.web.controller;

import com.ftninformatika.jwd.modul3.cinema.model.Ticket;
import com.ftninformatika.jwd.modul3.cinema.service.TicketService;
import com.ftninformatika.jwd.modul3.cinema.support.TicketToTicketDTO;
import com.ftninformatika.jwd.modul3.cinema.web.dto.TicketDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/tickets")
@Validated
public class TicketController {

    @Autowired
    private TicketService ticketService;
    
    @Autowired
    private TicketToTicketDTO toDto;

    @GetMapping
    public ResponseEntity<List<TicketDTO>> getAll(){

        List<Ticket> tickets = ticketService.findAll();

        return new ResponseEntity<>(toDto.convertAll(tickets), HttpStatus.OK);
    }
    
    @GetMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TicketDTO> getOne(@PathVariable Long id){
    	Ticket ticket = ticketService.findOne(id);
    	if(ticket != null) {
    		return new ResponseEntity<TicketDTO>(toDto.convert(ticket), HttpStatus.OK);
    	}else {
    		return new ResponseEntity<TicketDTO>(HttpStatus.BAD_REQUEST);
    	}
    }

}
