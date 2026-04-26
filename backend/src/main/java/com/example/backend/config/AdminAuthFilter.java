package com.example.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AdminAuthFilter extends OncePerRequestFilter {

    private final TokenStore tokenStore;

    public AdminAuthFilter(TokenStore tokenStore) {
        this.tokenStore = tokenStore;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();
        
        // Allow H2 console and contact GET through
        if (uri.startsWith("/h2-console")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Protect POST, PUT, DELETE endpoints (Admin operations)
        // Bypass /api/v1/contact (clients sending messages)
        // Bypass /api/v1/auth/login (admin logging in)
        String method = request.getMethod();
        boolean isAdminOperation = "POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method) || "DELETE".equalsIgnoreCase(method);
        boolean isPublicEndpoint = uri.startsWith("/api/v1/contact") || uri.startsWith("/api/v1/auth/login");

        if (isAdminOperation && !isPublicEndpoint) {
            
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Missing Bearer token.");
                return;
            }

            String token = authHeader.substring(7);
            if (!tokenStore.isValidToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Invalid or expired token.");
                return;
            }
        }
        
        // Also protect GET /api/v1/contact (Admin viewing messages)
        if ("GET".equalsIgnoreCase(method) && uri.startsWith("/api/v1/contact")) {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ") || !tokenStore.isValidToken(authHeader.substring(7))) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Invalid or expired token.");
                return;
            }
        }
        
        filterChain.doFilter(request, response);
    }
}
