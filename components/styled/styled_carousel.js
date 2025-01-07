// Styled Components (StyledCarousel.js)
import styled from "styled-components";

export const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ThumbnailsWrapper = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "row" : "column")};
  gap: 10px;
  max-width: ${({ isMobile }) => (isMobile ? "100%" : "120px")};
  overflow-x: ${({ isMobile }) => (isMobile ? "auto" : "hidden")};
  justify-content: ${({ isMobile }) => (isMobile ? "center" : "flex-start")};
  margin-top: ${({ isMobile }) => (isMobile ? "10px" : "0")};
`;

export const ThumbnailImage = styled.img`
  width: ${({ isMobile }) => (isMobile ? "50px" : "70px")};
  cursor: pointer;
  border-radius: 8px;
  border: ${({ isActive }) => (isActive ? "2px solid black" : "2px solid transparent")};
  transition: border 0.3s ease;

  &:hover {
    border: 3px solid black;
  }
`;

export const MainImageWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const MainImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: ${({ isMobile }) => (isMobile ? "pointer" : "auto")};
`;

export const MainImage = styled.img`
  width: 100%;
  height: auto;
  transform-origin: ${({ x, y }) => `${x}% ${y}%`};
  transform: ${({ isZoomed }) => (isZoomed ? "scale(2)" : "scale(1)")};
  transition: transform 0.3s ease;
`;

export const FullscreenModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalImage = styled.img`
  max-width: 90%;
  max-height: 70%;
  margin-bottom: 10px;
  border-radius: 10px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
`;
