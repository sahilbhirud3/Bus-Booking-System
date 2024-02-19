import  { useEffect, useState } from 'react';
import styles from './styles.module.css'; // Import your CSS file
import { axiosInst } from '../../service/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const id = localStorage.getItem('id');
  //const history = useHistory();
  const jwtToken=localStorage.getItem("jwtToken");

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

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
      
      const response = await axiosInst.post('/user/change-password', {
        id,
        oldPassword,
        newPassword,
      },{
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      );

      if (response.data.success) {
        toast.success('Password changed successfully.');
        // Redirect to login or another page
        // history.push('/login');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing your request.');
    }
  };


  useEffect(() => {
    // Check if jwtToken exists in localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      // Redirect user to the main page
      window.location = "/login";
    }
  }, []);



  return (
    <div className={styles.change_password_container}>
      <div className={styles.change_password_form_container}>
        <div className={styles.change_password_left}>
          <h1>Welcome Back</h1>
        </div>
        <div className={styles.change_password_right}>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            
            <h1>Change Password</h1>
            <label>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              required
              className={styles.change_password_input}
            />
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
              Change Password
            </button>
          </form>
          
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ChangePassword;
