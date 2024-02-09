import React from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";

import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useState, useEffect } from "react";
import { axiosInst } from "src/axiosInstance";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("handlelogin");
    axiosInst
      .post("user/signin", {
        email: inputEmail,
        password: inputPassword,
      })
      .then((response) => {
        console.log("Response:", response.data);
        if (
          response.data.jwt &&
          response.data.mesg === "Successful Authentication!!!"
        ) {
          // Save the JWT token to localStorage
          localStorage.setItem("jwtToken", response.data.jwt);
          localStorage.setItem("login", true);

          navigate("/dashboard");
          window.location.reload();
          setInputEmail("");
          setInputPassword("");
          return true; // Authentication success
        } else {
          return false; // Authentication failed
        }

        // Handle the response data as needed
      })
      .catch((error) => {
        setShowAlert(true);
        console.error("Error:", error);
        // Handle errors if any
      });
    // if(inputEmail === "admin" && inputPassword === "admin") {
    //   localStorage.setItem("login", true);
    //   console.log(localStorage.getItem("login"));

    //   navigate("/dashboard");
    //   window.location.reload();
    //   setInputEmail("");
    //   setInputPassword("");
    // }
  };
  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
    {showAlert && <div className="alert alert-danger" role="alert">Login failed! Please check your credentials.</div>}
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="email"
                        type="email"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Spark Bus</h2>
                    <p>Spark Bus Admin Sign in</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    </>
  );
};

export default Login;
