import React from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const BannerSection = () => {
  return (
    <Wrapper>
      <ImageContainer>
        <DimmedImage
          src="/Banner.jpg"
          alt="Decorative Image"
          fill
          priority
          sizes="100vw, 1200px"
        />
        <Overlay>
          <Heading>Made with Precision</Heading>
          <SubHeading>Explore Our Unique Modernistic Furniture</SubHeading>
        </Overlay>
      </ImageContainer>
    </Wrapper>
  );
};

export default BannerSection;

// Animations
const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 50px;
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 350px;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const DimmedImage = styled(Image)`
  object-fit: cover;
  filter: brightness(0.5); /* Dim the image */
  border-radius: 10px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 2;
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  margin: 0;
  animation: ${fadeInRight} 1.5s ease-in-out;
  background: linear-gradient(to right, white, red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 1.3rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.5rem;
  margin-top: 10px;
  animation: ${fadeInUp} 1.5s ease-in-out;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8;
  }
`;
