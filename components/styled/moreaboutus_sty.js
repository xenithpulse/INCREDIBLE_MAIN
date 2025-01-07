import styled from 'styled-components';
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

// Mobile version of the Box
export const Box_2 = styled.div`
  background-color: #000;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-left: 0%;
  flex: 1;
  min-width: 280px;
  border: 1px solid #555; /* Solid grey border */
  max-width: 300px;
  align-items: center; /* Center the column layout */
`;

// Large screen version of the Box
export const Box = styled.div`
  padding: 50px;
  background-color: #000;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1; /* Default flex value for larger screens */
  min-width: 280px;
  max-width: 100%; /* Prevent the box from overflowing its container */
  height: 300px;
  overflow: hidden;
  border: 1px solid #555; /* Solid grey border */
  position: relative;
  cursor: pointer;
  box-sizing: border-box; /* Ensure padding is included in the height */

  @media (max-width: 768px) {
    display: none; /* Hide large screen version on mobile */
  }
`;

// Box outline effect using ::before pseudo-element for large screens
const BoxOutlineEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  pointer-events: none;
  z-index: 10;

  @media (max-width: 768px) {
    display: none;  /* Hide outline effect on small screens */
  }
`;

const Line = styled.div`
  position: absolute;
  background: linear-gradient(90deg, #CE20F9, #5200FF);
  transition: all 1.5s ease-out;
  height: 4px;
  width: 0%;
`;

const TopLine = styled(Line)`
  top: 0;
  left: 0;
`;

const BottomLine = styled(Line)`
  bottom: 0;
  right: 0;
`;

const LeftLine = styled(Line)`
  top: 0;
  left: 0;
  height: 0%;
  width: 2px;
`;

const RightLine = styled(Line)`
  bottom: 0;
  right: 0;
  height: 0%;
  width: 2px;
`;

export const BoxWithOutlineEffect = ({ children }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);  // Check initial screen size

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);  // Update screen size state on resize
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);

  const handleMouseEnter = () => {
    if (isLargeScreen && topLineRef.current && bottomLineRef.current && leftLineRef.current && rightLineRef.current) {
      topLineRef.current.style.width = '100%';
      bottomLineRef.current.style.width = '100%';
      leftLineRef.current.style.height = '100%';
      rightLineRef.current.style.height = '100%';
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen && topLineRef.current && bottomLineRef.current && leftLineRef.current && rightLineRef.current) {
      topLineRef.current.style.width = '0%';
      bottomLineRef.current.style.width = '0%';
      leftLineRef.current.style.height = '0%';
      rightLineRef.current.style.height = '0%';
    }
  };

  return isLargeScreen ? (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isLargeScreen && (
        <BoxOutlineEffect>
          <TopLine ref={topLineRef} />
          <BottomLine ref={bottomLineRef} />
          <LeftLine ref={leftLineRef} />
          <RightLine ref={rightLineRef} />
        </BoxOutlineEffect>
      )}
      {children}
    </Box>
  ) : (
    <Box_2>
      {children}
    </Box_2>
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
