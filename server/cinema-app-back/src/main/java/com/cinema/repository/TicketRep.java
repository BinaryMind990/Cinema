package com.cinema.repository;

import com.cinema.model.Ticket;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRep extends JpaRepository<Ticket, Long> {

	@Query("SELECT t FROM Ticket t WHERE "
			+ "t.user.id = :id "
			+ "ORDER BY t.projection.dateAndTime DESC")
	Page<Ticket> findByUser(@Param("id") Long id, Pageable page);
}
