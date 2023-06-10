package com.cinema.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.cinema.model.Movie;
import com.cinema.service.MovieService;
import com.cinema.web.dto.MovieDTO;

@Component
public class MovieDTOToMovieUpdate implements Converter<MovieDTO, Movie> {

	@Autowired
	private MovieService movieService;

	@Override
	public Movie convert(MovieDTO dto) {
		Movie movie = movieService.findById(dto.getId());
		movie.setName(dto.getName());
		movie.setDuration(dto.getDuration());
		movie.setCountry(dto.getCountry());
		movie.setDescription(dto.getDescription());
		movie.setDistributor(dto.getDistributor());
		movie.setYear(dto.getYear());
		movie.setPosterLink(dto.getPosterLink());
		movie.setDirector(dto.getDirector());
		movie.setImdbLink(dto.getImdbLink());

		return movie;
	}

}
