import styled from "@emotion/styled";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase.config";
const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user?.uid) {
      navigate("/home");
    }
  }, [user, navigate]);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <LoginContainer>
      <Button
        onClick={() => signInWithGoogle()}
        variant="contained"
        color="primary"
      >
        <GoogleIcon /> Sign In Create Notes
      </Button>
    </LoginContainer>
  );
};
const LoginContainer = styled.section`
  display: grid;
  place-items: center;
  min-height: 100vh;
  button {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;
export default Login;
