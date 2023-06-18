package com.cinema.repository;

import com.cinema.model.Movie;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRep extends JpaRepository<Movie, Long> {

    Movie findOneById(Long id);

    Movie save(Movie movie);

	List<Movie> findByDeleted(Boolean deleted);

	
	@Query("SELECT m FROM Movie m WHERE "
			+ "(:name = NULL OR m.name LIKE :name) AND "
			+ "(m.duration BETWEEN :durationMin AND :durationMax) AND "
			+ "(:country = NULL OR m.country LIKE :country%)  AND "
			+ "(:distributor = NULL OR m.distributor LIKE :distributor%) AND "
			+ "(m.year BETWEEN :yearMin AND :yearMax) AND "
			+ "m.deleted = false")
			
	Page<Movie> search(@Param("name") String name,@Param("durationMin") int durationMin,@Param("durationMax") int durationMax,@Param("country") String country,@Param("distributor") String distributor,@Param("yearMin") int yearMin,
			@Param ("yearMax") int yearMax,Pageable pageable);

}