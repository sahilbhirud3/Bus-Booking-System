// import { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./styles.module.css";
// import {axiosInst} from "../../service/axiosInstance";
// import { ToastContainer, toast } from "react-toastify";

// const Login = () => {
//   const [data, setData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = ({ currentTarget: input }) => {
//     setData({ ...data, [input.name]: input.value });
//   };

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const res=await axiosInst.post('/user/signin',data)
//       console.log(res.data);
// 			localStorage.setItem("jwtToken", res.data.jwt);	
//       localStorage.setItem("id", res.data.id);	
      
// 			window.location = "/";
// 		} catch (error) {
// 			if (
// 				error.response &&
// 				error.response.status >= 400 &&
// 				error.response.status <= 500
// 			) {
// 				setError(error.response.data.message);
// 			}
//       toast.warning(
//         "Oops! Could not login, Please re-check the id and password"
//       );
// 		}
// 	};
 
//   return (
//     <>
//     <ToastContainer />
//       <div className={styles.login_container}>
//         <div className={styles.login_form_container}>
//           <div className={styles.left}>
//             <form className={styles.form_container} onSubmit={handleSubmit}>
//               <h1>Login to Your Account</h1>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 onChange={handleChange}
//                 value={data.email}
//                 required
//                 className={styles.input}
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 onChange={handleChange}
//                 value={data.password}
//                 required
//                 className={styles.input}
//               />
//               {error && <div className={styles.error_msg}>{error}</div>}
//               <button type="submit" className={styles.green_btn}>
//                 Sign In
//               </button>
//               <Link to="/forgot-password">Forgot Password?</Link>
             
//             </form>
//           </div>
//           <div className={styles.right}>
//             <h1>New Here ?</h1>
//             <Link to="/signup">
//               <button type="button" className={styles.white_btn}>
//                 Sign Up
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { axiosInst } from "../../service/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if jwtToken exists in localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      // Redirect user to the main page
      window.location = "/";
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res=await axiosInst.post('/user/signin',data)
      console.log(res.data);
			localStorage.setItem("jwtToken", res.data.jwt);	
      localStorage.setItem("id", res.data.id);	
      
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
      toast.warning(
        "Oops! Could not login, Please re-check the id and password"
      );
		}
	};
 
  return (
    <>
    <ToastContainer />
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Login to Your Account</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign In
              </button>
              <Link to="/forgot-password">Forgot Password?</Link>
             
            </form>
          </div>
          <div className={styles.right}>
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
