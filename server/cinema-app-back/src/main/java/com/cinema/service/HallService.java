package com.cinema.service;

import java.util.List;
import com.cinema.model.Hall;

public interface HallService {

	Hall findOne(Long id);

	List<Hall> findAll();

}
