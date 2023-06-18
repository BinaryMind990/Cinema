package com.cinema.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Hall {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String name;

	@OneToMany(mappedBy = "hall", cascade = CascadeType.ALL)
	private List<Projection> projections = new ArrayList<Projection>();

	@ManyToMany
	@JoinTable(name = "type_hall", joinColumns = @JoinColumn(name = "hall_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "type_id", referencedColumnName = "id"))
	private List<Type> types = new ArrayList<Type>();

	@OneToMany(mappedBy = "hall")
	private List<Seat> seats = new ArrayList<Seat>();

	public Hall(Long id, String name, List<Type> types) {
		super();
		this.id = id;
		this.name = name;
		this.types = types;
	}

	public Hall(String name, List<Type> types) {
		super();
		this.name = name;
		this.types = types;
	}

	public Hall() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Type> getTypes() {
		return types;
	}

	public void setTypes(List<Type> types) {
		this.types = types;
	}

	public List<Projection> getProjections() {
		return projections;
	}

	public void setProjections(List<Projection> projections) {
		this.projections = projections;
	}

	public List<Seat> getSeats() {
		return seats;
	}

	public void setSeats(List<Seat> seats) {
		this.seats = seats;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, types);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Hall other = (Hall) obj;
		return Objects.equals(id, other.id) && Objects.equals(name, other.name) && Objects.equals(types, other.types);
	}

	@Override
	public String toString() {
		return "Hall [id=" + id + ", name=" + name;
	}

}
