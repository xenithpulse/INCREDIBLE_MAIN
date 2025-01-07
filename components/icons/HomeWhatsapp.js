import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const WhatsAppIcon = () => {
  const router = useRouter();

  // Check if the current route is the homepage
  if (router.pathname !== '/') {
    return null; // Don't show the icon if it's not the homepage
  }

  return (
    <IconContainer href="https://wa.link/ibyx74" target="_blank" rel="noopener noreferrer">
      <FaWhatsapp size={40} color="white" />
    </IconContainer>
  );
};

export default WhatsAppIcon;

// Styled Components
const IconContainer = styled.a`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #25d366;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* For devices smaller than 768px */
  @media (max-width: 768px) {
    padding: 15px;
    bottom: 10px;
    right: 10px;
  }

  /* For devices smaller than 480px (extra small screens like phones) */
  @media (max-width: 480px) {
    padding: 10px;
    bottom: 5px;
    right: 5px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;
