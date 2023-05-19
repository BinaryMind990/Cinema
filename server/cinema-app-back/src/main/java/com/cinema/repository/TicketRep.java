package com.cinema.repository;

import com.cinema.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRep extends JpaRepository<Ticket, Long> {
}
