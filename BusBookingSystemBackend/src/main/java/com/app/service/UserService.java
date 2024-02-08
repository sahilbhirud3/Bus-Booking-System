package com.app.service;

import com.app.dto.Signup;

public interface UserService {
//sign up
	Signup userRegistration(Signup reqDTO);
}
