package com.cinema.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema.model.Type;

public interface TypeRep extends JpaRepository<Type, Long> {

}
