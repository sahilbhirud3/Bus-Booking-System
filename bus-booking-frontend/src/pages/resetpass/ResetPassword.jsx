import  { useState,useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import styles from './styles.module.css'; // Import your CSS file
import { axiosInst } from "../../service/axiosInstance";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react/prop-types
const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    if (token) {
        setToken(token);
    }
    
}, [location]);
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.warn('Passwords do not match.');
      return;
    }

    try {
      const response = await axiosInst.post('/password-reset/reset', { token, password:confirmNewPassword });
      // Handle successful response
      if (response.status==200) {
          toast.success(response.data,' Login with new password.');
      } else {
          // Show error toast
          toast.error("Something went wrong"+response.data);
      }
  } catch (error) {
      // Show error toast
      toast.error('An error occurred while processing your request.');
  }
  };


  return (
    <div className={styles.change_password_container}>
      <div className={styles.change_password_form_container}>
        <div className={styles.change_password_left}>
          <h1>Welcome Back</h1>
        </div>
        <div className={styles.change_password_right}>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            
            <h1>Set New Password</h1>
            
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
              className={styles.change_password_input}
            />
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              required
              className={styles.change_password_input}
            />
            {message && <div className={styles.change_password_error_msg}>{message}</div>}
            <button type="submit" className={styles.change_password_green_btn}>
              Set Password
            </button>
          </form>
          
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ResetPassword;
