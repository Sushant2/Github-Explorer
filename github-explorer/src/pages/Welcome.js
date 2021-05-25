import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    <Wrapper>
      <div className="container">
        <h1>Welcome</h1>
        <Link to="/login">
          <button className="btn">Login/Signup</button>
        </Link>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-9);
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;

export default Welcome;
