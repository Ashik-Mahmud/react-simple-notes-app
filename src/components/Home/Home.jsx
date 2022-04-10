import styled from "@emotion/styled";
import React from "react";
import { Toaster } from "react-hot-toast";
import Notes from "../Notes/Notes";
const Home = () => {
  return (
    <>
      <Toaster />
      <HomeContainer>
        <Notes />
      </HomeContainer>
    </>
  );
};
const HomeContainer = styled.section`
  padding: 3rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;
export default Home;
