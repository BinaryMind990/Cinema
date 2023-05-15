package com.ftninformatika.jwd.modul3.cinema.service;

import java.util.List;

import com.ftninformatika.jwd.modul3.cinema.model.Hall;

public interface HallService {
	
	Hall findOne(Long id);
	
	List<Hall> findAll();

}
