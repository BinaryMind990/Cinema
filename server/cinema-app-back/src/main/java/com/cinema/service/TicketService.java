package com.cinema.service;

import com.cinema.model.Ticket;
import com.cinema.web.dto.TicketDTOCreate;
import java.util.List;

public interface TicketService {

    List<Ticket> findAll();

    Ticket findOne(Long id);

    Ticket save(TicketDTOCreate dto, String userName);

    Ticket delete(Long id);
}
