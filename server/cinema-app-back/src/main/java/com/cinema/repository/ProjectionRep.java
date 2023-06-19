package com.cinema.repository;

import com.cinema.model.Projection;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectionRep extends JpaRepository<Projection, Long> {

	Projection findOneById(Long id);

	@Query("SELECT p FROM Projection p\n"
			+ "WHERE p.hall.id = :hallId\n"
			+ "AND date(p.dateAndTime) = date(:dateTime)")
	List<Projection> findList(@Param("hallId") Long hallId, @Param("dateTime") LocalDateTime dateTime);

	@Query("SELECT p FROM Projection p\n"
			+ "WHERE date(p.dateAndTime) = date(:date)\n"
			+ "AND p.deleted = false \n"
			+ "ORDER BY p.movie, p.dateAndTime")
	List<Projection> search(@Param("date") LocalDate date);

	List<Projection> findByDeleted(boolean deleted);

	@Query("SELECT p FROM Projection p WHERE "
			+ "(:movieId = NULL OR p.movie.id = :movieId) AND "
			+ "(:localDate = NULL OR date(p.dateAndTime) = date(:localDate)) AND "
			+ "(:typeId = NULL OR p.type.id = :typeId) AND "
			+ "(:hallId = NULL OR p.hall.id = :hallId) AND "
			+ "(p.ticketPrice BETWEEN :minPrice AND :maxPrice) AND "
			+ "p.deleted = false")
	List<Projection> findByParameters(@Param("movieId")Long movieId, @Param("localDate") LocalDate localDate, @Param("typeId") Long typeId, @Param("hallId") Long hallId, @Param("minPrice") Double minPrice,
	@Param("maxPrice")	Double maxPrice, Sort sort);

	@Query("SELECT p FROM Projection p WHERE "
			+ " date(p.dateAndTime) BETWEEN date(:dateFrom) and date(:dateTo)")
	List<Projection> findByDateAndTimeBetween(@Param("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo);

	@Query("SELECT p FROM Projection p WHERE "
			+ "(p.dateAndTime) > CURRENT_TIMESTAMP "
			+ "AND p.deleted = false")
	List<Projection> findByDateAndTimeAfter();

	@Query("SELECT DISTINCT date(p.dateAndTime) FROM Projection p "
			+ "WHERE p.dateAndTime > CURRENT_TIMESTAMP "
			+ "ORDER BY p.dateAndTime")
	List<String> findDates();
}
