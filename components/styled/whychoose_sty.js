// whyChooseUs.styles.js
import styled from 'styled-components';

export const Section = styled.section`
  padding: 50px 20px;
  background: #000;
  text-align: center;
  position: relative; /* Required for absolute positioning of ::before */
  border-radius: 8px; /* Match the border-radius of the section */


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
