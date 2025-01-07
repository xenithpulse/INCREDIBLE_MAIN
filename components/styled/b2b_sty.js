import styled, { keyframes } from "styled-components";

export const B2BSection = styled.section`
  position: relative;
  width: 100%;
  padding: 50px 20px;
  background-color: #000;
  display: flex;
  flex-direction: column; /* Stack content vertically on smaller screens */
  align-items: center;
  justify-content: center;
  margin-top: 0px;
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const GradientTitle = styled.h1`
  font-family: 'Montserrat';
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  background: linear-gradient(to right, #00BFFF, #8A2BE2, #EE82EE, #FF69B4);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 3s ease infinite;
  word-break: break-word; /* Prevents text from overflowing on small screens */
  white-space: pre-wrap;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 20px);
    height: calc(100% + 10px);
    background: radial-gradient(ellipse at center, rgba(174, 71, 255, 0.3), transparent);
    filter: blur(10px);
    z-index: -1;
    pointer-events: none;
  }

  /* Responsive font sizes using fluid typography */
  font-size: clamp(7rem, 10vw, 8.5rem); /* Most important change */
  padding: 0 50px; /* Add horizontal padding */

  @media (max-width: 468px) {
    margin-right:10%;
  }
`;