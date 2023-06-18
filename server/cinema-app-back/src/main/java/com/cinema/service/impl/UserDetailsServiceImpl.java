package com.cinema.service.impl;

import com.cinema.model.Users;
import com.cinema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Primary
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private UserService userService;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
    Users user = userService.findbyUserName(userName).orElse(null);

    if (user == null || user.getDeleted()) {   
      throw new UsernameNotFoundException(String.format("No user found with username '%s'.", userName));
    } else {
      List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

      String role = "ROLE_" + user.getRole().toString();
      grantedAuthorities.add(new SimpleGrantedAuthority(role));

      return new org.springframework.security.core.userdetails.User(
          user.getUserName().trim(),
          user.getPassword().trim(),
          grantedAuthorities);
    }
  }
}
