package com.example.backend.config;

import org.springframework.stereotype.Component;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TokenStore {

    // Thread-safe set of active tokens
    private final Set<String> activeTokens = ConcurrentHashMap.newKeySet();

    public void addToken(String token) {
        activeTokens.add(token);
    }

    public boolean isValidToken(String token) {
        return activeTokens.contains(token);
    }

    public void removeToken(String token) {
        activeTokens.remove(token);
    }
}
