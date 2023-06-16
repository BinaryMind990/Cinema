package com.cinema.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cinema.model.Projection;
import com.cinema.service.ReportDtoInterface;


@Repository
public interface ReportRep extends JpaRepository<Projection, Long> {
	
	
	
	@Query( value = "SELECT s.pMovieId AS movieId, m.name AS 'name',  COUNT(s.pId) AS numberOfProjections, SUM(s.Psum) AS sum, SUM(s.soldTickets) AS soldTicketsForMovie  FROM\r\n"
			+ "(SELECT p.id AS pId, p.movie_id AS pMovieId, p.date_and_time AS date_time, p.ticket_price, COUNT(t.id) AS soldTickets, ticket_price*COUNT(t.projection_id) AS Psum FROM cinemaapp.projection p\r\n"
			+ "LEFT JOIN cinemaapp.ticket t ON t.projection_id = p.id\r\n"
			+ "GROUP BY p.id) AS s\r\n"
			+ "LEFT JOIN cinemaapp.movie m ON m.id = s.pMovieId\r\n"
			+ "WHERE s.date_time BETWEEN :dateFrom AND :dateTo \r\n"
			+ "GROUP BY s.pMovieId", nativeQuery = true)
	List<ReportDtoInterface> getReport(@Param ("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo);

}
