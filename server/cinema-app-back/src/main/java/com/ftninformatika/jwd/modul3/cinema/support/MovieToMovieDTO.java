package com.ftninformatika.jwd.modul3.cinema.support;

import com.ftninformatika.jwd.modul3.cinema.model.Movie;
import com.ftninformatika.jwd.modul3.cinema.web.dto.MovieDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MovieToMovieDTO implements Converter<Movie, MovieDTO> {


    @Override
    public MovieDTO convert(Movie movie) {
    	
    	MovieDTO dto = new MovieDTO();
    	dto.setId(movie.getId());
    	dto.setName(movie.getName());
    	dto.setDuration(movie.getDuration());
    	dto.setCountry(movie.getCountry());
    	dto.setDescription(movie.getDescription());
    	dto.setDistributor(movie.getDistributor());
    	dto.setYear(movie.getYear());
    	

        return dto;
    }

    public List<MovieDTO> convertAll(List<Movie> movies){
        List<MovieDTO> dtos = new ArrayList<>();

        for(Movie m: movies){
            dtos.add(convert(m));
        }

        return dtos;
    }
}
