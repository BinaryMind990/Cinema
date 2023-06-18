package com.cinema.service.impl;

import com.cinema.model.Movie;
import com.cinema.repository.MovieRep;
import com.cinema.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JpaMovieService implements MovieService {

	@Autowired
	private MovieRep movieRep;

	@Override
	public Optional<Movie> findOne(Long id) {
		return Optional.empty();
	}

	@Override
	public Movie findById(Long id) {
		return movieRep.findOneById(id);
	}

	@Override
	public List<Movie> findAll() {
		return movieRep.findByDeleted(false);
	}

	@Override
	public Movie save(Movie movie) {
		movie.setDeleted(false);
		movie.setVersion(0);
		return movieRep.save(movie);
	}

	@Override
	public Movie update(Movie movie) {
		return movieRep.save(movie);
	}

	@Override
	public Movie delete(Long id) {
		Optional<Movie> movie = movieRep.findById(id);

		if (movie.get().getProjections().isEmpty()) {
			movieRep.deleteById(id);
			return movie.get();
		}

		if(movie.get().getProjections().stream().noneMatch(p -> p.getDateAndTime().isAfter(LocalDateTime.now()))) {	
			movie.get().setDeleted(true);	
			movieRep.save(movie.get());
			return movie.get();
		}

		return null;
	}

	@Override
	public Page<Movie> search() {
		return null;
	}

	@Override
	public Page<Movie> findByParameters(String name, Integer durationMin, Integer durationMax, String country,
			String distributor, Integer yearMin, Integer yearMax, String sortBy, String sortAscOrDesc, int pageNo) {

		if(durationMin == null)
			durationMin = 0;
		if(durationMax == null)
			durationMax = Integer.MAX_VALUE;
		if(yearMin == null)
			yearMin = 1900;
		if(yearMax == null)
			yearMax = LocalDate.now().getYear() +1;
		if(sortAscOrDesc == null ||(!sortAscOrDesc.equalsIgnoreCase("asc") && !sortAscOrDesc.equalsIgnoreCase("desc")))
			sortAscOrDesc = "ASC";
		if(sortBy == null) {
			sortBy = "name";
		} else if( !sortBy.equals("name") && !sortBy.equals("duration") && !sortBy.equals("year") 
				&& !sortBy.equals("country") && !sortBy.equals("distributor"))
			sortBy = "name";

		if(sortAscOrDesc.equalsIgnoreCase("desc")) {
			return movieRep.search(name, durationMin, durationMax, country, distributor, yearMin, yearMax, PageRequest.of(pageNo, 5, Sort.by(sortBy).descending()));
		}
		else 
			return movieRep.search(name, durationMin, durationMax, country, distributor, yearMin, yearMax, PageRequest.of(pageNo, 5, Sort.by(sortBy).ascending()));
	}

}
