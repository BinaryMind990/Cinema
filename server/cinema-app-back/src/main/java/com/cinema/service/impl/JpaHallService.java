package com.cinema.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.model.Hall;
import com.cinema.repository.HallRep;
import com.cinema.service.HallService;

@Service
public class JpaHallService implements HallService {

	@Autowired
	private HallRep hallRep;

	@Override
	public Hall findOne(Long id) {
		Hall hall = hallRep.getOne(id);
		return hall;
	}

	@Override
	public List<Hall> findAll() {

		return hallRep.findAll();
	}

}
