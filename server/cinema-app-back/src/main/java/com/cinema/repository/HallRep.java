package com.cinema.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema.model.Hall;

public interface HallRep extends JpaRepository<Hall, Long> {

}
