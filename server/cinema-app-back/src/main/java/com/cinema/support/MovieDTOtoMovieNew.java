package com.cinema.support;

import com.cinema.model.Movie;
import com.cinema.web.dto.MovieDTO;
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
        movie.setDirector(dto.getDirector());
        movie.setImdbLink(dto.getImdbLink());

        return movie;
    }
}
