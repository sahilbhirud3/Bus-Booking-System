package com.app.service;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.PasswordResetTokenRepository;
import com.app.entities.PasswordResetToken;
import com.app.entities.User;

@Service
public class PasswordResetService {

	 private static final long RESET_TOKEN_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public void createPasswordResetTokenForUser(User user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(new Date(System.currentTimeMillis() + RESET_TOKEN_EXPIRATION));
        tokenRepository.save(resetToken);
        emailService.sendPasswordResetEmail(user, token);
    }

    @Transactional(readOnly = true)
    public PasswordResetToken findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    @Transactional
    public void deleteToken(PasswordResetToken token) {
        tokenRepository.delete(token);
    }
}
