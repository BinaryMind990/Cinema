package com.cinema.repository;

import com.cinema.enumeration.UserRole;
import com.cinema.model.Users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findFirstByUserName(String userName);

    Optional<Users> findFirstByUserNameAndPassword(String userName, String password);

	List<Users> findByDeleted(boolean deleted);

	@Query("SELECT u from Users u WHERE "
			+ "(:userName = NULL OR u.userName LIKE :userName%) AND "
			+ "(:role = NULL OR u.role = :role) AND "
			+ " deleted = 0")
	Page<Users> search(@Param("userName") String userName,@Param("role") UserRole role, Pageable pageable);

	@Query("SELECT u FROM Users u WHERE "
			+ "u.eMail LIKE :email")
	Optional<Users> findFirstByEmail(@Param("email") String email);
}
