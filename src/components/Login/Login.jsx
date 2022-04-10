import styled from "@emotion/styled";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase.config";
const Login = () => {
  const navigate = useNavigate();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  if (auth.currentUser) {
    navigate("/home");
  }
  return (
    <LoginContainer>
      <Button
        onClick={() => signInWithGoogle()}
        variant="contained"
        color="primary"
      >
        <GoogleIcon /> Google
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
