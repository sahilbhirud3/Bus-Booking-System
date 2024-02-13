// Import necessary dependencies
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import  "./forgotpass.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
//   const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call your backend API to initiate the password recovery process
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Password reset email sent. Check your inbox.');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while processing your request.');
    }
  };

  const handleLoginClick = () => {
    // history.push('/login');
  };

  return (
    
<div className="forgot_password_container">
  <div className="forgot_password_form_container">
    <div className="forgot_password_left">
      <h1>Welcome Back</h1>
    </div>
    <div className="forgot_password_right">
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="forgot_password_input"
        />
        <button type="submit" className="forgot_password_green_btn">
          Reset Password
        </button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Remember your password?{' '}
        <span onClick={handleLoginClick}>Login</span>
      </p>
    </div>
  </div>
</div>

  );
};

export default ForgotPassword;
