import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <img
        src="https://i0.wp.com/saedx.com/blog/wp-content/uploads/2019/01/saedx-blog-featured-70.jpg?fit=1200%2C500&ssl=1"
        alt="notfound"
      />
    </NotFoundContainer>
  );
};
const NotFoundContainer = styled.section`
  text-align: center;
`;
export default NotFound;
