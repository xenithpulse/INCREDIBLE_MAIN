import Image from 'next/image';
import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
import { useRouter } from 'next/router';

const ProductBoxContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: border 0.3s ease, transform 0.3s ease;

  // Default size for larger screens
  width: 350px;
  height: 350px;

  &:hover {
    border: 1px solid black;
    transform: scale(1.05);
  }

  // Adjust size for small screens
  @media (max-width: 768px) {
    width: 190px;
    height: 190px;
  }
`;

const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 5px;
`;


const PriceContainer = styled.div`
  width: 87px;
  height: 32px;
  background: black;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 70px;
    height: 26px;
  }
`;

const Price = styled.span`
  font-size: 14px;
  color: white;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const DiscountedPercentage = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: green;
  color: white;
  padding: 5px 10px;
  border-radius: 16px;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 8px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1; // Or calculate dynamically if needed
  overflow: hidden;
`;

const imageWidth = 300; // Provide default width
const imageHeight = 300; // Provide default height
const aspectRatio = `${imageWidth}/${imageHeight}`;



const ProductBox = ({ product }) => {
  const router = useRouter();
  const handleImageClick = () => {
    router.push(`/product/${product.slug}`);
  };

  const discount_amount = (product.price * product.discounted_percentage) / 100;
  const baseprice = product.price - discount_amount;

  const [imageLoaded, setImageLoaded] = useState(false);


  return (
    <ProductBoxContainer>
      <ImageContainer aspectRatio={aspectRatio} onClick={handleImageClick}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: '100%', height: '100%', bgcolor: '#eee' }}
          />
        )}
        <Image
          src={product.images[0]}
          alt={product.title}
          width={imageWidth}
          height={imageHeight}
          layout="responsive"
          objectFit="cover"
          sizes="(max-width: 767px) 100vw, (min-width: 768px) 33vw"
          priority
          onLoad={() => setImageLoaded(true)} // Correct way to handle image load
          onError={() => console.error("Error loading image")} //Handle errors
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </ImageContainer>
      {product.discounted_percentage > 0 && (
        <DiscountedPercentage>{product.discounted_percentage}% off</DiscountedPercentage>
      )}
      <TitleContainer>
        <PriceContainer>
          <Price>
            <strong>PKR {baseprice}</strong>
          </Price>
        </PriceContainer>
      </TitleContainer>
    </ProductBoxContainer>
  );
};

export default ProductBox;