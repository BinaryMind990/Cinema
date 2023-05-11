package com.ftninformatika.jwd.modul3.cinema.support;

import com.ftninformatika.jwd.modul3.cinema.model.Projection;
import com.ftninformatika.jwd.modul3.cinema.service.HallService;
import com.ftninformatika.jwd.modul3.cinema.service.MovieService;
import com.ftninformatika.jwd.modul3.cinema.service.TypeService;
import com.ftninformatika.jwd.modul3.cinema.web.dto.ProjectionDtoCreate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ProjectionDTOtoProjectionNew implements Converter<ProjectionDtoCreate, Projection> {

    
    @Autowired
    private MovieService movieService;
    
    @Autowired
    private HallService hallService;
    
    @Autowired
    private TypeService typeService;

    @Override
    public Projection convert(ProjectionDtoCreate dto) {

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
