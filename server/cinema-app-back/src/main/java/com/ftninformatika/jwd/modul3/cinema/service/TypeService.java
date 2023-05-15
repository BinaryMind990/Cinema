package com.ftninformatika.jwd.modul3.cinema.service;

import java.util.List;

import com.ftninformatika.jwd.modul3.cinema.model.Type;

public interface TypeService {
	
	Type findOne (Long id);
	
	List<Type> findAll();

}
