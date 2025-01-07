// whyChooseUs.styles.js
import styled, { keyframes } from 'styled-components';

export const Section = styled.section`
  padding: 50px 20px;
  background: #000;
  text-align: center;
  position: relative; /* Required for absolute positioning of ::before */
  border-radius: 0px; /* Match the border-radius of the section */


  /* Pseudo-element for gradient outline */
  &::before {
    content: '';
    position: absolute;
    top: -2px; /* Adjust the offset to create the outline effect */
    left: 2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(90deg, #CE20F9, #5200FF);
    border-radius: 8px; /* Match the border-radius of the section */
    z-index: -2; /* Ensure it's behind the content */
  }

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;


export const Heading = styled.h2`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subheading = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const Description = styled.p`
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 40px;
  line-height: 1.6;
  

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
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
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  position: relative; // Needed for pseudo-element glow
  background: linear-gradient(to right, #00BFFF, #8A2BE2, #EE82EE, #FF69B4);
  background-size: 400% 400%; // Make background larger for animation
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 3s ease infinite; // Animate the gradient

  // Glow effect
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 20px); // Slightly larger than text
    height: calc(100% + 10px); // Slightly larger than text
    background: radial-gradient(ellipse at center, rgba(174, 71, 255, 0.3), transparent); // Adjust glow color and intensity
    filter: blur(10px); // Adjust blur amount
    z-index: -1; // Place glow behind the text
    pointer-events: none;
  }

  // Responsive font size
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const StatsContainer = styled.div`
  display: grid;
  /* Use minmax for better control over minimum and maximum widths */
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
  width: 100%; // Ensure container takes full width of parent
  max-width: 1200px; // Optional: Set a maximum width for larger screens
  margin-inline: auto; // Center the container horizontally
  

  /* Improved mobile responsiveness */
  @media (max-width: 768px) { // Use a more common breakpoint
    grid-template-columns: 1fr; // Single column on mobile
    gap: 1rem; // Reduce gap on mobile for better spacing
    align-items: center;
  }

  /* Optional: Add a larger breakpoint for even wider screens */
  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); // Wider columns on very large screens
    gap: 30px; // Increase gap on very large screens
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #555; /* Solid grey border */

  /* Add transition for hover effects */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const StatNumber = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.span`
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;
`;
