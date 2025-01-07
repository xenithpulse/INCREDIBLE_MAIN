import styled, {keyframes} from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';

// Section styling for full-width layout
export const Section = styled.section`
  padding: 50px 20px;
  background-color: #000;
  display: flex;
  height: auto; /* Adjust to accommodate the content height */
  justify-content: center;
  margin-bottom: -25px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start; /* Align the items at the top */
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  max-width: 1400px;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack the boxes vertically on small screens */
    gap: 20px; /* Increased gap between boxes on small screens */
    align-items: center; /* Center the column layout */
  }
`;



// Keyframes for border animation
const animateBorder = keyframes`
  0% { transform: scaleX(0); }
  25% { transform: scaleX(1); }
  50% { transform: scaleY(1); }
  75% { transform: scaleX(0); }
  100% { transform: scaleY(0); }
`;

// Line styles for borders
const Line = styled.div`
  position: absolute;
  background: linear-gradient(90deg, #CE20F9, #5200FF);
  transform-origin: left;
  animation: ${animateBorder} 12s linear infinite;
`;

const TopLine = styled(Line)`
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  transform-origin: left;
  animation-delay: ${({ delay }) => delay}s;
`;

const BottomLine = styled(Line)`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  transform-origin: right;
  animation-delay: ${({ delay }) => delay + 1.5}s;
`;

const LeftLine = styled(Line)`
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  transform-origin: top;
  animation-delay: ${({ delay }) => delay + 3}s;
`;

const RightLine = styled(Line)`
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  transform-origin: bottom;
  animation-delay: ${({ delay }) => delay + 4.5}s;
`;

// Box outline container
const BoxOutlineEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

// Box container
export const Box = styled.div`
  position: relative;
  padding: 50px;
  text-align: center;
  flex: 1; /* Default flex value for larger screens */
  min-width: 280px;
  max-width: 100%; /* Prevent the box from overflowing its container */
  height: 300px;
  background-color: #000;
  border: 1px solid #555;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;

  &:hover ${TopLine}, &:hover ${BottomLine}, &:hover ${LeftLine}, &:hover ${RightLine} {
    animation-play-state: running;
  }
`;


// Main component
export const BoxWithOutlineEffect = ({ children, delay = 0 }) => {
  return (
    <Box>
      <BoxOutlineEffect>
        <TopLine delay={delay} />
        <BottomLine delay={delay} />
        <LeftLine delay={delay} />
        <RightLine delay={delay} />
      </BoxOutlineEffect>
      {children}
    </Box>
  );
};


// Box contents and layout
export const Logo = styled.div`
  margin-bottom: 15px;
  color: #ff6347;
  margin-left: 0%;
`;

export const Heading = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #fff;
  line-height: 1.5;
`;
