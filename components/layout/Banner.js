import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';

const BannerSection = () => {
  const bannerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(bannerRef.current); // Stop observing once visible
        }
      },
      {
        threshold: 0.3, // Trigger when 50% of the banner is visible
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <Wrapper ref={bannerRef}> {/* Add ref to the wrapper */}
      <ImageContainer>
        <DimmedImage
          src="/Banner.jpg"
          alt="Decorative Image"
          fill
          priority
          sizes="100vw, 1200px"
        />
        <Overlay>
          <Heading isVisible={isVisible}>Made with Precision</Heading> {/* Pass isVisible prop */}
          <SubHeading isVisible={isVisible}>Explore Our Unique Minimalistic HouseHold Items</SubHeading> {/* Pass isVisible prop */}
        </Overlay>
      </ImageContainer>
    </Wrapper>
  );
};

export default BannerSection;

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
  max-width: 100%x;
  height: 350px;
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
  filter: brightness(0.3); /* Dim the image */
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
  font-size: 4.5rem;
  margin: 0;
  opacity: 0;
  transform: translateX(50px);


  background: linear-gradient(to right, #04fbff, #4169E1, #8A2BE2, #FF69B4); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: ${({ isVisible }) =>
    isVisible &&
    css`
      ${fadeInRight} 1.5s ease-in-out forwards
    `};

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
  opacity: 0;
  transform: translateY(50px);

  animation: ${({ isVisible }) =>
    isVisible &&
    css`
      ${fadeInUp} 1.5s ease-in-out forwards
    `};

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;