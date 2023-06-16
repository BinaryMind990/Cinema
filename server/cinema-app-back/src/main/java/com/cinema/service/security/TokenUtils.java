package com.cinema.service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.cinema.model.Users;
import com.cinema.service.UserService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class TokenUtils {
	
	@Autowired
	private UserService userService;

	@Value("myXAuthSecret")
	private String secret;

	@Value("631152000")
	private Long expiration;

	public String getUsernameFromToken(String token) {
		String username;
		try {
			Claims claims = this.getClaimsFromToken(token);
			username = claims.getSubject();
		} catch (Exception e) {
			username = null;
		}
		return username;
	}

	private Claims getClaimsFromToken(String token) {
		Claims claims;
		try {
			claims = Jwts.parser().setSigningKey(this.secret)
					.parseClaimsJws(token).getBody();
		} catch (Exception e) {
			claims = null;
		}
		return claims;
	}

	public Date getExpirationDateFromToken(String token) {
		Date expirationDate;
		try {
			final Claims claims = this.getClaimsFromToken(token);
			expirationDate = claims.getExpiration();
		} catch (Exception e) {
			expirationDate = null;
		}
		return expirationDate;
	}

	private boolean isTokenExpired(String token) {
		final Date expirationDate = this.getExpirationDateFromToken(token);
		return expirationDate.before(new Date(System.currentTimeMillis()));
	}

	public boolean validateToken(String token, UserDetails userDetails) {
		final String username = getUsernameFromToken(token);
		return username.equals(userDetails.getUsername())
				&& !isTokenExpired(token);
	}

	public String generateToken(UserDetails userDetails) {
		String username = userDetails.getUsername();
	
		Optional<Users> optionalUser = userService.findbyUserName(username);
		if (optionalUser.isPresent()) {
			Users loggedInUser = optionalUser.get();
			Long userId = loggedInUser.getId();

			Map<String, Object> claims = new HashMap<>();
			claims.put("sub", userDetails.getUsername());
			claims.put("id", userId);
			claims.put("role", userDetails.getAuthorities().toArray()[0]);
			claims.put("created", new Date());
	
			return Jwts.builder().setClaims(claims)
					.setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
					.signWith(SignatureAlgorithm.HS512, secret).compact();
		}

		return null;
	}
}
