package com.cinema.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.model.Type;
import com.cinema.repository.TypeRep;
import com.cinema.service.TypeService;

@Service
public class JpaTypeService implements TypeService {

	@Autowired
	private TypeRep typeRep;

	@Override
	public Type findOne(Long id) {

		Type type = typeRep.getOne(id);
		return type;
	}

	@Override
	public List<Type> findAll() {
		return typeRep.findAll();
	}
}
