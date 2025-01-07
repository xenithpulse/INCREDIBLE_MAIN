import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { ProductWrapper, Top, Bottom, Inside, WhiteBox } from "../styled/productsbox";
import Image from "next/image";

const ImageWrapper = styled.div`
  background-color: #fff;
  padding: 10px;
  position: relative;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;

  /* Ensuring image fills the container */
  div {
    width: 100%;
    height: 100%;
    position: relative;
  }

  /* Media query for responsive design */
  @media (max-width: 768px) {
    height: 150px; /* Adjust image height for small screens */
  }
`;

export default function ProductBox({ _id, title, price, images, discounted_percentage, properties }) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/product/${_id}`); // Navigate to the single product page
  };

  const originalPrice = parseFloat(price);
  const discountedPrice = discounted_percentage > 0 ? originalPrice * (1 - discounted_percentage / 100) : originalPrice;

  return (
    <ProductWrapper>
      <Top $imageUrl={images?.[0]} onClick={handleImageClick} />
      <Bottom>
        <div className="left">
          <div className="details">
            <h1>{title}</h1>
            {discounted_percentage > 0 ? (
              <div className="discount">
                <p>PKR {discountedPrice.toFixed(2)}
                   <span className="discount-percentage">({discounted_percentage}% off)</span>
                </p>
                <span>PKR {originalPrice.toFixed(2)}</span>
              </div>
            ) : (
              <p>PKR {price}</p>
            )}
          </div>
          <div
            className={`buy ${isClicked ? 'clicked' : ''}`}
            onClick={() => {
              setIsClicked(prev => !prev); // Toggle the isClicked state
              handleImageClick();
            }}
          >
            <AddShoppingCartIcon />
          </div>
        </div>
      </Bottom>
      <Inside>
        <div className="icon">
          <InfoIcon />
        </div>
        <div className="contents">
          {properties && (
            <>
              {Object.keys(properties).map((pn) => (
                <div key={pn}>
                  <h4 style={{ color: 'white' }}>{pn}</h4>
                  {properties[pn].map((pp, idx) => (
                    <p key={idx}>{pp}</p>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </Inside>
      <ImageWrapper>

      <Image
          src={images?.[0]}  // The image source
          alt={title}         // Alt text for the image
          layout="fill"        // Fill the entire container
          objectFit="cover"    // Mimic the 'object-fit: cover' behavior
          onClick={handleImageClick} // OnClick event handler
        />
      </ImageWrapper>
    </ProductWrapper>
  );
}
