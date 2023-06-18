package com.cinema.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Type {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String name;

	@ManyToMany(mappedBy = "types", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Hall> halls = new ArrayList<Hall>();

	@OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
	private List<Projection> projections = new ArrayList<Projection>();

	public Type(Long id, String name, List<Hall> halls) {
		super();
		this.id = id;
		this.name = name;
		this.halls = halls;
	}

	public Type(String name, List<Hall> halls) {
		super();
		this.name = name;
		this.halls = halls;
	}

	public Type() {
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

	public List<Hall> getHalls() {
		return halls;
	}

	public void setHalls(List<Hall> halls) {
		this.halls = halls;
	}

	@Override
	public int hashCode() {
		return Objects.hash(halls, id, name);
	}

	public List<Projection> getProjections() {
		return projections;
	}

	public void setProjections(List<Projection> projections) {
		this.projections = projections;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Type other = (Type) obj;
		return Objects.equals(halls, other.halls) && Objects.equals(id, other.id) && Objects.equals(name, other.name);
	}

	@Override
	public String toString() {
		return "Type [id=" + id + ", name=" + name;
	}

}
