package com.ftninformatika.jwd.modul3.cinema.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftninformatika.jwd.modul3.cinema.model.Hall;
import com.ftninformatika.jwd.modul3.cinema.repository.HallRep;
import com.ftninformatika.jwd.modul3.cinema.service.HallService;

@Service
public class JpaHallService implements HallService {
	
	@Autowired
	private HallRep hallRep;

	@Override
	public Hall findOne(Long id) {
		Hall hall = hallRep.getOne(id);
		
		
		return hall;
	}

}
