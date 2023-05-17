package com.ftninformatika.jwd.modul3.cinema.repository;

import com.ftninformatika.jwd.modul3.cinema.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findFirstByUserName(String userName);

    Optional<Users> findFirstByUserNameAndPassword(String userName, String password);
}
