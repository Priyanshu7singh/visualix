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

    private static final String ADMIN_TOKEN = "visualix-admin-secret-2026";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();
        
        // Allow H2 console and contact GET through
        if (uri.startsWith("/h2-console")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Protect POST, PUT, DELETE endpoints (Admin operations) - except Contact POST
        String method = request.getMethod();
        if (("POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method) || "DELETE".equalsIgnoreCase(method))
                && !uri.startsWith("/api/v1/contact")) {
            
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.equals("Bearer " + ADMIN_TOKEN)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Invalid or missing token.");
                return;
            }
        }
        
        filterChain.doFilter(request, response);
    }
}
