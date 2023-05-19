package com.cinema.web.controller;

import com.cinema.model.Ticket;
import com.cinema.service.TicketService;
import com.cinema.support.TicketToTicketDTO;
import com.cinema.web.dto.TicketDTO;
import com.cinema.web.dto.TicketDTOCreate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/tickets")
@Validated
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketToTicketDTO toDto;

    @GetMapping
    public ResponseEntity<List<TicketDTO>> getAll() {

        List<Ticket> tickets = ticketService.findAll();
        return new ResponseEntity<>(toDto.convertAll(tickets), HttpStatus.OK);
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

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TicketDTO> create(@Valid @RequestBody TicketDTOCreate dto) {

        Ticket savedTicket = ticketService.save(dto);
        if (savedTicket == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(toDto.convert(savedTicket), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        System.out.println(id);
        Ticket deletedTicket = ticketService.delete(id);
        if (deletedTicket == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
