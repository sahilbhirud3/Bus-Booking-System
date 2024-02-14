package com.app.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.app.entities.User;

@Service
public class EmailService {

	 @Value("${api.basePath}")
	    private String basePath;

    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
    public void sendPasswordResetEmail(User user, String token) {
        MimeMessage message = emailSender.createMimeMessage();
        
        try {
        	MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setTo(user.getEmail());
            helper.setSubject("Password Reset Request");
            String emailContent = getEmailContent(user.getFirstName()+" "+user.getLastName(), token);
            helper.setText(emailContent, true);
            helper.addInline("logo", new ClassPathResource("images/logo.png"));
            emailSender.send(message);
        } catch (MessagingException e) {
            // Handle exception
            e.printStackTrace();
        }
    }
    private String getEmailContent(String username, String token) {
        
        String resetUrl = basePath + "/reset?token=" + token;

        return "<html><head><style>" +
        "body { font-family: Arial, sans-serif; }" +
        ".container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
        ".logo { text-align: center; }" +
        ".content { margin-top: 20px; }" +
        ".reset-button { display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; }" +
        "</style></head><body>" +
        "<div class='container'>" +
        "<div class='logo'><img src='cid:logo' alt='Logo' style='width: 100px; height: auto;'></div>" +
        "<div class='content'>" +
        "<p>Dear " + username + ",</p>" +
        "<p>We received a request to reset your password. Click the button below to reset it:</p>" +
        "<p><a href='" + resetUrl + "' class='reset-button'>Reset Password</a></p>" +
        "<p>If you did not request a password reset, please ignore this email.</p>" +
        "<p>Best regards,<br/>Spark Bus Booking Team</p>" +
        "</div></div></body></html>";
    }
}