package com.krisztavasas.db_library.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Service for JWT token generation, validation, and claims extraction.
 */
@Service
public class JwtService {

    private static final String TOKEN_VERSION = "v2";
    private static final String VERSION_CLAIM = "token_version";

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    /**
     * Extracts username (email) from JWT token.
     *
     * @param token JWT token
     * @return username
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts a specific claim from JWT token.
     *
     * @param token JWT token
     * @param claimsResolver function to extract claim
     * @param <T> claim type
     * @return extracted claim
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Generates JWT token for user.
     *
     * @param userDetails user details
     * @return JWT token
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Generates JWT token with additional claims.
     *
     * @param extraClaims additional claims
     * @param userDetails user details
     * @return JWT token
     */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    /**
     * Builds JWT token.
     *
     * @param extraClaims additional claims
     * @param userDetails user details
     * @param expiration token expiration time
     * @return JWT token
     */
    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        Map<String, Object> claims = new HashMap<>(extraClaims);
        claims.put(VERSION_CLAIM, TOKEN_VERSION);

        return Jwts
                .builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey())
                .compact();
    }

    /**
     * Validates JWT token against user details.
     *
     * @param token JWT token
     * @param userDetails user details
     * @return true if valid, false otherwise
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token) && isTokenVersionValid(token);
    }

    /**
     * Checks if JWT token has valid version.
     *
     * @param token JWT token
     * @return true if version is valid, false otherwise
     */
    public boolean isTokenVersionValid(String token) {
        try {
            Claims claims = extractAllClaims(token);
            String version = claims.get(VERSION_CLAIM, String.class);
            return TOKEN_VERSION.equals(version);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Checks if JWT token is expired.
     *
     * @param token JWT token
     * @return true if expired, false otherwise
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extracts expiration date from JWT token.
     *
     * @param token JWT token
     * @return expiration date
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extracts all claims from JWT token.
     *
     * @param token JWT token
     * @return all claims
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Gets signing key for JWT token.
     *
     * @return signing key
     */
    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
