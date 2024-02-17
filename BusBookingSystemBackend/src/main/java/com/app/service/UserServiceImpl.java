package com.app.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.UserDao;
import com.app.dto.Signup;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	//dep : dao layer i/f
	@Autowired
	private UserDao userDao;
	//dep
	@Autowired
	private ModelMapper mapper;
	//dep 
	@Autowired
	private PasswordEncoder encoder;
	

	@Override
	public Signup userRegistration(Signup reqDTO) {
		//dto --> entity
		User user=mapper.map(reqDTO, User.class);
		user.setPassword(encoder.encode(user.getPassword()));//pwd : encrypted using SHA
		return mapper.map(userDao.save(user), Signup.class);
	}
    public void resetPassword(User user, String newPassword) {
        // Encode the new password before updating
        String encodedPassword = encoder.encode(newPassword);
        
        // Update the user's password in the database
        user.setPassword(encodedPassword);
        userDao.save(user);
    }

    
    public User findByEmail(String email) {
        // Retrieve the user from the database based on the email address
        Optional<User> userOptional = userDao.findByEmail(email);
        return userOptional.orElse(null); // Return null if user not found
    }
    
    public boolean verifyPassword(Long userId, String oldPassword) {
        User user = userDao.findById(userId).orElse(null);

        // Check if the user exists
        if (user == null) {
            return false;
        }

        // Use the password encoder to verify the old password
        return encoder.matches(oldPassword, user.getPassword());
    }
    
    public void changePassword(Long userId, String newPassword) {
        User user = userDao.findById(userId).orElse(null);

        // Check if the user exists
        if (user != null) {
            // Use the password encoder to encode the new password before saving
            user.setPassword(encoder.encode(newPassword));
            userDao.save(user);
        }
    }
}
