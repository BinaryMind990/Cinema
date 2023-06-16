package com.cinema.service;

import java.util.List;
import com.cinema.model.Type;

public interface TypeService {

	Type findOne(Long id);

	List<Type> findAll();

}
