package com.ftninformatika.jwd.modul3.cinema.repository;

import com.ftninformatika.jwd.modul3.cinema.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRep extends JpaRepository<Ticket, Long> {
}
