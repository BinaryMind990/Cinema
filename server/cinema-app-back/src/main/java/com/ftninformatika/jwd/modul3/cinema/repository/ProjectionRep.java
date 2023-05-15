package com.ftninformatika.jwd.modul3.cinema.repository;

import com.ftninformatika.jwd.modul3.cinema.model.Projection;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
    List<Projection> findList(@Param("hallId") Long hallId,@Param("dateTime") LocalDateTime dateTime);


    @Query("SELECT p FROM Projection p\n"
    		+ "WHERE date(p.dateAndTime) = date(:dateTime)")
	List<Projection> search(@Param("dateTime") LocalDateTime dateTime); 
    
    
}
