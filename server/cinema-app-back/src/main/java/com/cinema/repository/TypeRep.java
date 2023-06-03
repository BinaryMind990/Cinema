package com.cinema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cinema.model.Type;

@Repository
public interface TypeRep extends JpaRepository<Type, Long> {

}
