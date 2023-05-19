package com.cinema.support;

import com.cinema.model.Projection;
import com.cinema.service.HallService;
import com.cinema.service.MovieService;
import com.cinema.service.TypeService;
import com.cinema.web.dto.ProjectionDTOCreate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ProjectionDTOtoProjectionNew implements Converter<ProjectionDTOCreate, Projection> {

    @Autowired
    private MovieService movieService;

    @Autowired
    private HallService hallService;

    @Autowired
    private TypeService typeService;

    @Override
    public Projection convert(ProjectionDTOCreate dto) {

        Projection projection = new Projection();

        projection.setMovie(movieService.findById(dto.getMovieId()));
        projection.setHall(hallService.findOne(dto.getHallId()));
        projection.setTicketPrice(dto.getTicketPrice());
        projection.setType(typeService.findOne(dto.getTypeId()));
        projection.setDateAndTime(getLocalDateTime(dto.getDateTimeStr()));

        return projection;
    }

    private LocalDateTime getLocalDateTime(String dateTime) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return LocalDateTime.parse(dateTime, formatter);
    }
}
