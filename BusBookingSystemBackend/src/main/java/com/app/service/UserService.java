package com.app.service;

import com.app.dto.Signup;
import com.app.entities.User;

public interface UserService {
//sign up
	Signup userRegistration(Signup reqDTO);
	void resetPassword(User user, String newPassword);
	User findByEmail(String email);
}
