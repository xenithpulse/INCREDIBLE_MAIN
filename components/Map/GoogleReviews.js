import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import GoogleIcon from "./Google_Icon";
import Slider from "react-slick";
import { useMediaQuery } from 'react-responsive';
import ReviewButton from "./Button";
import Center from "@/homecenter";

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  background-color: transparent;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    flex-direction: row;
    padding: 0 3rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;

  @media (min-width: 640px) {
    justify-content: flex-start;
  }
`;

const Star = styled(FaStar)`
  color: #fbbf24; /* Yellow color */
  height: 1.25rem;
  width: 1.25rem;
  margin-top: -23px;
`;

const ReviewInfo = styled.p`
  margin-left: 0.5rem;
  color: #6b7280; /* Gray color */
  font-size: 0.865rem;
  margin-top: -8px;
`;


const ReviewRow = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 0 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 3rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ReviewBox = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
`;

const ReviewStars = styled.div`
  display: flex;
  margin-top: 18px;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ReviewText = styled.p`
  color: #4b5563; /* Text gray */
  margin-bottom: 1rem;
`;

const ReviewerName = styled.p`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const ReviewDate = styled.p`
  color: #6b7280; /* Gray color */
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const ProfilePic = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
`;

function GoogleReviews() {
  const [isClient, setIsClient] = useState(false); // State to track client-side rendering
  const reviews = [
    {
      id: 1,
      text: "You can find unique decorations and customized furniture for your home and workplace",
      name: "Suleman Saghir",
      date: "a year ago",
      profilePic: "https://lh3.googleusercontent.com/a-/ALV-UjWvPClmRlaMIDtnCXyRmMVISjt-3hPUxFEtDjWJZYmr4mfzekYh=w36-h36-p-rp-mo-ba4-br100",
    },
    {
      id: 2,
      text: "",
      name: "Khizar Ameer",
      date: "Feb 15, 2022",
      profilePic: "https://lh3.googleusercontent.com/a/ACg8ocJxa11zmOK1r-79gazvXLF-1EbbpoXAErtSijos-Zcaxz5DilaLQg=w36-h36-p-rp-mo-br100",
    },
    {
      id: 3,
      text: "The Best Home Decor in very reasonable prices in town. Must visit Highly recommend 10/10",
      name: "Zainab Lodhi",
      date: "2 years ago",
      profilePic: "https://lh3.googleusercontent.com/a/ACg8ocJCJfO9VaKNwlS2UmXz8qRS6Y1KBU695-NAhYbVi4HiweCQOg=w36-h36-p-rp-mo-br100",
    },
    {
      id: 4,
      text: "Expert staff best service 😊",
      name: "Tahir Saleem",
      date: "Sep 30, 2024",
      profilePic: "https://lh3.googleusercontent.com/a-/ALV-UjUmFu8gFxH3cFBSJWIanYGrIAf0uMUlVGk-J9GGNKCRKISy2cbu=w36-h36-p-rp-mo-br100",
    },

  ];

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,  // Adjusts height based on content
  };

  useEffect(() => {
    setIsClient(true); // Set to true after the component is mounted on the client
  }, []);

  if (!isClient) return null; // Return nothing on the server-side render

  return (
    <Center>
      <Container>
        {/* Header Row */}
        <HeaderRow>
          <div>
            <Title>What Our Customers Say</Title>
            <StarsWrapper>
              {[...Array(5)].map((_, index) => (
                <Star key={index} />
              ))}
              <ReviewInfo>(4.6 based on cumulative reviews)</ReviewInfo>
            </StarsWrapper>
          </div>
          <ReviewButton />
        </HeaderRow>

        {/* Review Row */}
        {isMobile ? (
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id}>
                <ReviewBox>
                  <GoogleIcon />
                  <ReviewStars>
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} />
                    ))}
                  </ReviewStars>
                  <ReviewText>{review.text}</ReviewText>
                  <ReviewerName>{review.name}</ReviewerName>
                  <ReviewDate>{review.date}</ReviewDate>
                  <ProfilePic src={review.profilePic} alt={review.name} />
                </ReviewBox>
              </div>
            ))}
          </Slider>
        ) : (
          <ReviewRow>
            {reviews.map((review) => (
              <ReviewBox key={review.id}>
                <GoogleIcon />
                <ReviewStars>
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} />
                  ))}
                </ReviewStars>
                <ReviewText>{review.text}</ReviewText>
                <ReviewerName>{review.name}</ReviewerName>
                <ReviewDate>{review.date}</ReviewDate>
                <ProfilePic src={review.profilePic} alt={review.name} />
              </ReviewBox>
            ))}
          </ReviewRow>
        )}
      </Container>
    </Center>
  );
}

export default GoogleReviews;
