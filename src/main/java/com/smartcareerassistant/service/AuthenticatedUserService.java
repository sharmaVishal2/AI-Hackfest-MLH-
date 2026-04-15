package com.smartcareerassistant.service;

import com.smartcareerassistant.exception.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class AuthenticatedUserService {

    public String extractUserId(Jwt jwt) {
        if (jwt == null || jwt.getSubject() == null || jwt.getSubject().isBlank()) {
            throw new AccessDeniedException("Unable to resolve authenticated user");
        }
        return jwt.getSubject();
    }

    public void assertSameUser(Jwt jwt, String userId) {
        String authenticatedUserId = extractUserId(jwt);
        if (!authenticatedUserId.equals(userId)) {
            throw new AccessDeniedException("You can only access your own history");
        }
    }
}
