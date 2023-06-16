package com.cinema.service;

import com.cinema.model.Ticket;
import com.cinema.web.dto.TicketDTOCreate;
import com.cinema.web.dto.TicketsListDtoCreate;

import java.util.List;

public interface TicketService {

    List<Ticket> findAll();

    Ticket findOne(Long id);

    String save(TicketDTOCreate dto, String userName);

    Ticket delete(Long id);

    String saveList(TicketsListDtoCreate dto, String userName);
}
