import styled from "@emotion/styled";
import { FacebookOutlined } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import {
  useAuthState,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
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
  const [signInWithFacebook] = useSignInWithFacebook(auth);
  return (
    <LoginContainer>
      <div>
        <Button
          onClick={() => signInWithGoogle()}
          variant="contained"
          color="info"
        >
          <GoogleIcon /> Google Sign In
        </Button>
        <Button
          onClick={() => signInWithFacebook()}
          variant="contained"
          color="primary"
        >
          <FacebookOutlined /> Facebook Sign In
        </Button>
      </div>
    </LoginContainer>
  );
};
const LoginContainer = styled.section`
  display: grid;
  place-items: center;
  min-height: 100vh;
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
  }
  button {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;
export default Login;
