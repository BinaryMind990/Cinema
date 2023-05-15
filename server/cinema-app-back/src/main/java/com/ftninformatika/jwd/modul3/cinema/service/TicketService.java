package com.ftninformatika.jwd.modul3.cinema.service;

import com.ftninformatika.jwd.modul3.cinema.model.Ticket;
import com.ftninformatika.jwd.modul3.cinema.web.dto.TicketDtoCreate;

import java.util.List;

public interface TicketService {

    List<Ticket> findAll();
    Ticket findOne(Long id);
    Ticket save(TicketDtoCreate dto);
    Ticket delete (Long id);
}
