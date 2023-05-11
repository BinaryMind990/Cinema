package com.ftninformatika.jwd.modul3.cinema.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.ftninformatika.jwd.modul3.cinema.model.Movie;
import com.ftninformatika.jwd.modul3.cinema.service.MovieService;
import com.ftninformatika.jwd.modul3.cinema.web.dto.MovieDTO;

@Component
public class MovieDtoToMovieUpdate implements Converter<MovieDTO, Movie>{
	
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
		
		
		return movie;
	}

}
