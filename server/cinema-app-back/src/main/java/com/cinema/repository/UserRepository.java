package com.cinema.repository;

import com.cinema.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findFirstByUserName(String userName);

    Optional<Users> findFirstByUserNameAndPassword(String userName, String password);

	List<Users> findByDeleted(boolean deleted);
}
