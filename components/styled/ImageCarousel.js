import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { useState } from "react";

// Wrapper for the entire carousel (for large and small devices)
const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column; /* For mobile: stack everything vertically */
  gap: 20px;
  overflow: hidden;
  
  @media (min-width: 768px) {
    flex-direction: row; /* For large devices: show side by side */
  }
`;

// Main image wrapper
const MainImageWrapper = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  
  @media (min-width: 768px) {
    width: calc(100% - 120px); /* Adjust the width when thumbnails are on the left */
  }
`;

// Main image style
const MainImage = styled.img`
  width: 100%;
  height: auto;
`;

// Thumbnails Wrapper for small devices (stacked under the main image)
const ThumbnailsWrapper = styled.div`
  display: flex;
  overflow-x: auto; /* Allow horizontal scrolling */
  justify-content: center;
  gap: 5px;
  padding: 10px 0;
  width: 100%;
  margin-top: -10px;
  
  @media (min-width: 768px) {
    flex-direction: column;
    gap: 10px;
    position: absolute;
    top: 0;
    margin-left: 0px;
    left: 0;
    width: 4%;
    height: 100%;
    margin-top: 0;
  }
`;

// Thumbnail image styling
const ThumbnailImage = styled.img`
  width: 70px;
  cursor: pointer;
  border-radius: 8px;
  border: ${({ isActive }) => (isActive ? "2px solid black" : "2px solid transparent")};
  transition: border 0.3s ease;
  &:hover {
    border: 3px solid black; /* Hover effect */
  }

  @media (max-width: 768px) {
    width: 35px; /* Smaller thumbnails on mobile */
  }
`;

// Modal Styling (for both small and large devices)
const ModalWrapper = styled.div`
  display: ${({ showModal }) => (showModal ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  overflow: auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal Content
const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Close Button Styling
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Carousel Component
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Handle when a thumbnail is clicked
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  // Handle when the main image is clicked on small devices
  const handleImageClick = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Main Carousel Wrapper */}
      <CarouselWrapper>
        {/* Main Image Section */}
        <MainImageWrapper>
          <Carousel
            showThumbs={false}
            infiniteLoop
            selectedItem={currentIndex}
            onChange={setCurrentIndex}
            useKeyboardArrows
            autoPlay
            stopOnHover
            dynamicHeight={false}
            showStatus={false}
            showIndicators={false}
            onClickItem={handleImageClick} // Click to open modal
          >
            {images.map((image, index) => (
              <div key={index}>
                <MainImage src={image} alt={`Product Image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </MainImageWrapper>

        {/* Thumbnails Section (scrollable on mobile) */}
        <ThumbnailsWrapper>
          {images.map((image, index) => (
            <ThumbnailImage
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              isActive={index === currentIndex}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </ThumbnailsWrapper>
      </CarouselWrapper>

      {/* Modal Section for large and small devices */}
      {showModal && (
        <ModalWrapper showModal={showModal}>
          <ModalContent>
            {/* Main Image in Modal */}
            <Carousel
              showThumbs={false}
              selectedItem={currentIndex}
              onChange={setCurrentIndex}
              useKeyboardArrows
              autoPlay
              stopOnHover
              dynamicHeight={false}
              showStatus={false}
              showIndicators={false}
            >
              {images.map((image, index) => (
                <div key={index}>
                  <MainImage src={image} alt={`Modal Image ${index + 1}`} />
                </div>
              ))}
            </Carousel>

            {/* Thumbnails below the main image */}
            <ThumbnailsWrapper>
              {images.map((image, index) => (
                <ThumbnailImage
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  isActive={index === currentIndex}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </ThumbnailsWrapper>

            {/* Close button for the modal */}
            <CloseButton onClick={closeModal}>X</CloseButton>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default ImageCarousel;
