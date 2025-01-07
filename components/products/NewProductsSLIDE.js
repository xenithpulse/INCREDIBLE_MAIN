import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductBox from './NewProductsBOX'; // Adjust the import based on your file structure
import Center from '@/homecenter';
import Title from '../styled/Title';

const SlideContainer = styled.div`
  overflow-x: scroll; // Allow horizontal scrolling
  overflow-y: hidden;
  width: 100%;
  position: relative;
  scroll-behavior: smooth; // Smooth scroll effect for user interaction
`;

const ProductTrack = styled.div`
  display: flex;
  gap: 10px; // Add gap between product boxes
  width: calc(100% * 6); // Width to accommodate 3 sets of products for seamless looping
  animation: ${({ isPaused }) => (isPaused ? 'none' : 'slide 50s linear infinite')}; // Conditional animation

  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-33.33%); // Move left by one-third of the total width
    }
  }

  @media (max-width: 768px) {
    width: calc(100% * 12); // Adjust width for smaller screens
  }
`;

const StyledProductBox = styled(ProductBox)`
  flex: 0 0 auto;
  width: calc(100% / 3); // Display 3 items at once on larger screens

  @media (max-width: 768px) {
    width: calc(100% / 1); // Display 1 item on small screens
  }
`;

const ProductSlide = ({ products }) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const handleScroll = () => {
    setIsPaused(true); // Pause animation on user scroll
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsPaused(false); // Resume animation after 3 seconds of inactivity
    }, 1000);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <SlideContainer ref={containerRef}>
      <ProductTrack isPaused={isPaused}>
        {products.concat(products).map((product, index) => ( // Duplicate products for seamless looping
          <StyledProductBox 
            key={`${product.id}-${index}`} // Ensure a unique key by appending the index
            product={product} 
          />
        ))}
      </ProductTrack>
    </SlideContainer>
  );
};

export default ProductSlide;
