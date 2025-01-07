import { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
import { PuffLoader } from "react-spinners";



const CarouselContainer = styled.div`
  position: relative;
  background-color: black;
  overflow: hidden;
  width: auto; /* Fixed width for the carousel */
  height: 700px; /* Fixed height for the carousel */
  margin-top: -2px;

  @media (max-width: 1024px) {
    height: 400px; /* Fixed height for the carousel */
    margin-top: -2px;
  }
  @media (max-width: 768px) {
    height: 240px; /* Fixed height for the carousel */
    margin-top: -2px;
  }
  @media (max-width: 640px) {
    height: 150px; /* Fixed height for the carousel */
    margin-top: -2px;
  }
`;

const CarouselImage = styled.div`
  width: 100%;
  height: auto;
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ loading }) => (loading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;


const Loader = styled.div`
  width: 12px; /* Adjusted size for the indicator loader */
  aspect-ratio: 1;
  border: 6px solid green;
  border-radius: 50%;
  position: relative;
  margin: 0 auto; /* Center loader in indicator */
  animation: l18 3s infinite linear; /* Sync with interval time */

  &::before {
    content: "";
    position: absolute;
    inset: -5px; /* Adjusted to fit */
    border-radius: 50%;
    animation: l18 3s infinite linear; /* Match the loader duration */
  }

  @keyframes l18 {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 100;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ $isActive }) => ($isActive ? "white" : "white")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: relative;
`;



const NextJsCarousel = () => {
  const carouselRef = useRef(null);
  const cursorRef = useRef(null);
  const [loading, setLoading] = useState(true); // State for PuffLoader
  const [activeIndex, setActiveIndex] = useState(0); // Track active index for indicators
  const [images, setImages] = useState([]); // Dynamically fetched images

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/images"); // Adjust API endpoint if needed
        const sortedImages = response.data.data.sort((a, b) => a.position - b.position);
        setImages(sortedImages.map((img) => img.url));
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Failed to fetch images:", error);
        setLoading(false); // Images fetched successfully
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (carouselRef.current && images.length > 0) {
      // Reset autoplay manually if required
      carouselRef.current.moveTo(0);
    }
  }, [images]);


  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);
  };


  const handleImageChange = (index) => {
    setActiveIndex(index); // Update active index when the image changes
  };

  return (
    <CarouselContainer id="carousel-page">
      <LoaderContainer loading={loading}>
        <PuffLoader color="#36d7b7" size={100} />
      </LoaderContainer>
      {!loading && (
      <Carousel
        ref={carouselRef}
        autoPlay
        infiniteLoop
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
        showIndicators={false}
        interval={3000}
        onError={handleImageError}
        onChange={handleImageChange} // Triggered on image change
      >
        {images.map((src, idx) => (
          <CarouselImage key={idx}>
            <Image
              src={src}
              alt={`Home Image ${idx + 1}`}
              width={2000}
              height={740}
              layout="responsive"
              objectFit="cover"
              onError={handleImageError}
            />
          </CarouselImage>
        ))}
      </Carousel>
      )}
{!loading && (
  <IndicatorContainer>
    {images.map((_, idx) => (
      <Indicator key={idx} active={activeIndex === idx}>
        {activeIndex === idx && <Loader />} {/* Show loader for the active index */}
      </Indicator>
    ))}
  </IndicatorContainer>
)}
    </CarouselContainer>
  );
};

export default NextJsCarousel;


