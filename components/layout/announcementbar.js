import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Text fade and slide animation
const fadeSlideAnimation = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const BarWrapper = styled.div`
  width: 100%;
  height: 30px;
  overflow: hidden;
  background: linear-gradient(
  270deg,
  #000000,  /* Pure Black */
  #1a0000,  /* Deep Crimson */
  #330000,  /* Dark Red */
  #660000,  /* Blood Red */
  #330000,  /* Dark Red */
  #1a0000,  /* Deep Crimson */
  #000000   /* Pure Black */
);



  background-size: 400% 400%;
  animation: ${gradientAnimation} 10s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
`;

const TextWrapper = styled.div`
  color: #f0f0f0;
  font-size: 0.7rem;
  font-weight: bold;
  text-align: center;
  animation: ${fadeSlideAnimation} 1.5s ease-in-out;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const AnnouncementBar = ({ messages }) => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000); // Change message every 5 seconds
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <BarWrapper>
      <TextWrapper key={currentMessage}>
        {messages[currentMessage]}
      </TextWrapper>
    </BarWrapper>
  );
};

export default AnnouncementBar;
