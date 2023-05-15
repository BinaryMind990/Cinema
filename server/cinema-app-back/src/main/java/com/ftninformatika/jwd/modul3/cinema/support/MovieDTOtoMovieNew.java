package com.ftninformatika.jwd.modul3.cinema.support;

import com.ftninformatika.jwd.modul3.cinema.model.Movie;
import com.ftninformatika.jwd.modul3.cinema.web.dto.MovieDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class MovieDTOtoMovieNew implements Converter<MovieDTO, Movie> {
   
    @Override
    public Movie convert(MovieDTO dto) {

        Movie movie = new Movie();
        movie.setName(dto.getName());
        movie.setYear(dto.getYear());
        movie.setDuration(dto.getDuration());
        movie.setCountry(dto.getCountry());
        movie.setDescription(dto.getDescription());
        movie.setDistributor(dto.getDistributor());
        movie.setPosterLink(dto.getPosterLink());
       
        return movie;
    }
}
