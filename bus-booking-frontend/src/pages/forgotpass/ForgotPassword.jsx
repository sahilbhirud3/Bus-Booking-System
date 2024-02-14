// Import necessary dependencies
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import  "./forgotpass.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInst } from "../../service/axiosInstance";
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

//   const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
      try {
        const response = await axiosInst.post('/password-reset/request', { email });
        toast.success(response.data);
      } catch (error) {
        toast.error(error.response.data);
      }
    
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
        
        <input
          type="email"
          placeholder='Enter your Registered Email Address'
          value={email}
          onChange={handleEmailChange}
          required
          className="forgot_password_input"
        />
        <button type="submit" className="forgot_password_green_btn">
          Reset Password
        </button>
      </form>
      
      <p>
        Remember your password?{' '}
        <a href="/login">Login</a>
      </p>
    </div>
  </div>
  <ToastContainer/>
</div>

  );
};

export default ForgotPassword;
