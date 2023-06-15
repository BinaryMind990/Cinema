package com.cinema.web.controller;

import com.cinema.model.Users;
import com.cinema.service.security.TokenUtils;
import com.cinema.service.UserService;
import com.cinema.support.UserDTOToUser;
import com.cinema.support.UserToUserDTO;
import com.cinema.support.UserToUserDtoForView;
import com.cinema.web.dto.AuthUserDTO;
import com.cinema.web.dto.UserChangePasswordByAdminDto;
import com.cinema.web.dto.UserDTO;
import com.cinema.web.dto.UserDtoForAdminView;
import com.cinema.web.dto.UserChangePasswordDTO;
import com.cinema.web.dto.UserRegistrationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDTOToUser toUser;

    @Autowired
    private UserToUserDTO toUserDTO;

    @Autowired
    private UserToUserDtoForView toDtoForView;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PreAuthorize("permitAll()")
    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody @Validated UserRegistrationDTO dto) {

        if (dto.getId() != null || !dto.getPassword().equals(dto.getConfirmPassword())
                || !userService.findbyUserName(dto.getUserName()).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Users user = toUser.convert(dto);

        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        user.setPassword(encodedPassword);

        return new ResponseEntity<>(toUserDTO.convert(userService.save(user)), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {

        if (!id.equals(userDTO.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Users userToChange = userService.findOne(id).get();

        if (SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            // Admin može mijenjati podatke korisnika
            Users user = toUser.convert(userDTO);
            return new ResponseEntity<>(toUserDTO.convert(userService.update(user)), HttpStatus.OK);
        } else if (userName.equals(userDTO.getUserName()) && userDTO.getUserName().equals(userToChange.getUserName())) {

            Users user = toUser.convert(userDTO);
            return new ResponseEntity<>(toUserDTO.convert(userService.update(user)), HttpStatus.OK);
        } else {

            return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(value = "/changeRole/{id}/{role}")
    public ResponseEntity<UserDTO> changeRole(@PathVariable Long id, @PathVariable String role) {
        Optional<Users> user = userService.findOne(id);

        if (!user.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String loggedUser = SecurityContextHolder.getContext().getAuthentication().getName();
        if (user.get().getUserName().equals(loggedUser))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        if (!role.equalsIgnoreCase("ADMIN") && !role.equalsIgnoreCase("USER"))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        Users userChangedRole = userService.changeRole(user.get(), role.toUpperCase());
        return new ResponseEntity<UserDTO>(toUserDTO.convert(userChangedRole), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> get(@PathVariable Long id) {

        Optional<Users> user = userService.findOne(id);
        if (!user.isPresent()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("error", "There is some errors, I will tell you later what is it");
            return new ResponseEntity<>(headers, HttpStatus.BAD_REQUEST);
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth.getAuthorities().toString().equals("[ROLE_USER]") && !auth.getName().equals(user.get().getUserName()))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        if (user.isPresent()) {
            return new ResponseEntity<>(toUserDTO.convert(user.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserDtoForAdminView>> getUsers(
            @RequestParam(required = false) String userName,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sort,
            @RequestParam(value = "pageNo", defaultValue = "0") int pageNo) {

        Page<Users> users = userService.searchUsers(userName, role, sortBy, sort, pageNo);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Pages", Integer.toString(users.getTotalPages()));

        return new ResponseEntity<>(toDtoForView.convertAll(users.getContent()), headers, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userService.findbyUserName(userName).get();
        if (user.getId() == id) { // onemogucava da admin obrise sam sebe
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Users deletedUser = userService.delete(id);
        if (deletedUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @PutMapping(value = "/changePassword/{id}")
    public ResponseEntity<Void> changePassword(@PathVariable Long id, @Valid @RequestBody UserChangePasswordDTO dto) {

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        boolean result;
        try {
            result = userService.changePassword(id, dto);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (result) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(value = "/adminChangePassword/{id}")
    public ResponseEntity<Void> adminChangePassword(@PathVariable Long id,
            @Valid @RequestBody UserChangePasswordByAdminDto dto) {
        if (!dto.getPassword().equals(dto.getConfirmPassword()))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        boolean result;

        try {
            result = userService.changePasswordByAdmin(id, dto);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (result) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }

    @PreAuthorize("permitAll()")
    @RequestMapping(path = "/auth", method = RequestMethod.POST)
    public ResponseEntity<String> authenticateUser(@RequestBody AuthUserDTO dto) {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                dto.getUsername(), dto.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        try {

            UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getUsername());
            return ResponseEntity.ok(tokenUtils.generateToken(userDetails));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
