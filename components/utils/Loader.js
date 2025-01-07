import React from 'react';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  /* Add gradient background */
  background: linear-gradient(225deg, #000000 50%, #4C6FBA 100%);
  background-size: 200% 200%;
  animation: gradientMovement 10s ease-in-out infinite;

  /* Optional: If you want the loader to have a white background */
  /* background: white; */
  
  /* Gradient animation */
  @keyframes gradientAnimation {
    0% {
      background-position: 0% 0%;
    }
    25% {
      background-position: 100% 50%;
    }
    50% {
      background-position: 50% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 50% 0%;
    }
  }
`;


export default function Loader() {
  return (
    <LoaderWrapper>
      <HashLoader color="#00b3b3" size={90} /> {/* Bright cyan color that contrasts with black */}
    </LoaderWrapper>
  );
}
