package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
 public ResponseEntity<String> requestPasswordReset(@RequestParam("email") String email) {
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
 public ResponseEntity<?> resetPassword(@RequestParam("token") String token,
                                         @RequestParam("password") String password) {
     PasswordResetToken resetToken = passwordResetService.findByToken(token);
     if (resetToken == null || resetToken.isExpired()) {
         return ResponseEntity.badRequest().build();
     }
     User user = resetToken.getUser();
     userService.resetPassword(user, password);
     passwordResetService.deleteToken(resetToken);
     return ResponseEntity.ok().build();
 }
}

