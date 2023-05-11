package com.ftninformatika.jwd.modul3.cinema.service.impl;

import com.ftninformatika.jwd.modul3.cinema.model.Ticket;
import com.ftninformatika.jwd.modul3.cinema.repository.TicketRep;
import com.ftninformatika.jwd.modul3.cinema.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JpaTicketService implements TicketService {

    @Autowired
    private TicketRep ticketRep;

    @Override
    public List<Ticket> findAll() {
        return ticketRep.findAll();
    }

    @Override
    public Ticket findOne(Long id) {
        return ticketRep.getOne(id);
    }
}
