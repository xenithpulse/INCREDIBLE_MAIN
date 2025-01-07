import styled from "styled-components";

// Styles for the overall layout
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px auto;
  width: 100%;
  margin-top: 70px;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 40px;
    margin: 80px auto;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 800px;

  @media (min-width: 768px) {
    flex: 1.5;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export const PriceSection = styled.div`
  font-size: 1.6rem;
  color: #28a745;
  font-weight: 800;

  @media (min-width: 768px) {
    font-size: 1.9rem;
  }
`;

export const Description = styled.div`
  font-size: 1rem;
  color: #000;

  .highlight {
    display: block;
    margin-top: 4px;
    margin-bottom: -3px;
  }

  @media (min-width: 768px) {
    font-size: 1.04rem;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: -2px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 5px;
  margin-top: -5px;
  @media (min-width: 768px) {
    width: 600px;
  }
`;

export const StyledSelect = styled.select`
  padding: 10px;
  font-size: 1rem;
  color: #333;
  width: 100%;
  max-width: 600px;
  height: 48px;
  border: ${({ hasError }) => (hasError ? '2px solid red' : '1px solid #ddd')};
  border-radius: 5px;
  background-color: #fff;
`;

export const AddToCartSection = styled.div`
  display: flex;
  margin-top: -3px;
  width: 100%;
  gap: 5px;
  max-width: 700px;
  flex-direction: row;

  @media (min-width: 768px) {
    width: 600px;
  }
`;

export const ShippingInfo = styled.p`
  margin-top: 0px;
  font-size: 0.9rem;
  color: #000;
  margin-bottom: 5px;

  &:before {
    content: '✔ ';
    color: green;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    margin-top: 10px;
  }
`;

export const ReturnsInfo = styled.p`
  margin-top: 5px;
  font-size: 0.9rem;
  color: #000;

  &:before {
    content: '✔ ';
    color: green;
    font-size: 1rem;
  }
`;

export const RequiredField = styled.span`
  color: red;
  margin-left: 2px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 3px;
`;

export const PropertyTitle = styled.h4`
  margin-bottom: 5px;
`;

export const MessageContainer = styled.div`
  position: fixed;
  bottom: 20%; /* Slightly above the bottom */
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  opacity: 0.9;
  z-index: 1000;
  transition: opacity 0.4s ease;
`;