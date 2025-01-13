import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

// Styled components for the About section
const AboutSection = styled.section`
  position: relative; // Set position for the overlay
  width: 100%;
  padding: 50px 20px;
  background-color: #000; // Fallback color
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;

  // Flexbox container to handle layout
  .about-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    position: relative; // Positioning context for z-index
    z-index: 1; // Ensure content is above the background

    opacity: 0;
    transform: translateY(20px);
    animation: fadeIn 1.5s ease-out forwards; // Apply the animation

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 15px;
    }
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // About text section
  .about-text {
    flex: 1;
    padding-right: 20px;
    text-align: center; // Center text

    h2 {
      font-size: 2rem;
      color: #fff;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.5rem;
      color: #fff;
      line-height: 1.5;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInText 1.5s ease-out 0.5s forwards; // Delay for text

      @media (max-width: 768px) {
        font-size: 0.9rem;
      }
    }
  }

  @keyframes fadeInText {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Image section
  .about-image {
    flex: 1;
    padding-left: 20px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInImage 1.5s ease-out 1s forwards; // Delay for image

    @media (max-width: 768px) {
      padding-left: 0;
    }
  }

  @keyframes fadeInImage {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Media queries for responsiveness
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0px 0px;
  }
`;

const AboutUs = () => {
  return (
    <AboutSection id="about-us">
      {/* Background Image */}
      <Image
        src="https://res.cloudinary.com/dcsk6j16i/image/upload/v1729856565/dmwmsj4vaeoxg2taw4kv.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        style={{ opacity: 0.3, zIndex: 0 }}
      />

      <div className="about-container">
        {/* Left side with text */}
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            At <strong style={{ color: "#00BFFF" }}>INCREDIBLE HOMES</strong>, we believe that your home should be a reflection of your unique style.
            We're dedicated to providing exceptional home decor and household items crafted with meticulous
            attention to detail and using premium materials.
          </p>
          <p>
            From design to delivery, we strive to exceed your
            expectations and help you create an incredible living space.
          </p>
        </div>
      </div>
    </AboutSection>
  );
};

export default AboutUs;
