package com.app.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResetRequest;
import com.app.entities.PasswordResetToken;
import com.app.entities.User;
import com.app.service.PasswordResetService;
import com.app.service.UserService;

//PasswordResetController.java
@RestController
@RequestMapping("/password-reset")
public class PasswordResetController {

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordResetService passwordResetService;

	@PostMapping("/request")
	public ResponseEntity<String> requestPasswordReset(@RequestBody Map<String, String> requestBody) {
		String email = requestBody.get("email");
		if (email == null) {
			String errorMessage = "Email not provided";
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}

		User user = userService.findByEmail(email);
		if (user == null) {
			String errorMessage = "User with email " + email + " not found";
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
		}

		passwordResetService.createPasswordResetTokenForUser(user);
		String message = "Password reset link has been sent to your email";
		return ResponseEntity.ok().body(message);
	}

	@PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody ResetRequest resetRequest) {
        String token = resetRequest.getToken();
        String password = resetRequest.getPassword();

        PasswordResetToken resetToken = passwordResetService.findByToken(token);
        if (resetToken == null) {
            return ResponseEntity.badRequest().body("Invalid token. Please request a new password reset link.");
        }

        if (resetToken.isExpired()) {
            return ResponseEntity.badRequest().body("The password reset link has expired. Please request a new one.");
        }

        User user = resetToken.getUser();
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found. Please request a new password reset link.");
        }

        userService.resetPassword(user, password);
        passwordResetService.deleteToken(resetToken);
        return ResponseEntity.ok().body("Password reset successfully.");
    }


}
