import styled, { keyframes } from 'styled-components';


// Responsive Grid Wrapper
export const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Default single column */
  gap: 20px;
  margin-left: -7%;
  margin-top: 20px;
  width: 100%;
  margin-bottom: 200px;

  @media screen and (min-width: 576px) {
    grid-template-columns: 1fr 1fr; /* Two columns on small devices */
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 2fr 2fr; /* Two columns on medium devices */
    height: auto;
  }
`;

// Header section (with responsive background color for smaller devices)
export const HeaderCor = styled.div`
  position: relative;
  width: 100%;
  padding: 10px; /* Added padding for spacing */
  
  @media screen and (max-width: 768px) {
  }
`;

// Box component with padding for small screens and margin for spacing
export const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 768px) {
    padding: 15px;
    margin: 15px;
  }
`;

// Product Info Cell with flexible wrapping
export const ProductInfoCell = styled.td`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// Product Image Box with responsive image sizing
export const ProductImageBox = styled.div`
  display: flex;
  width: 80px;
  height: 80px;
  margin-right: 15px;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

// Product Details column with dynamic width
export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 10px;

  @media screen and (min-width: 768px) {
    width: calc(100% - 120px); /* Adjust width based on image size */
  }
`;

// Product Title with responsive font size and ellipsis overflow
export const ProductTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
  }

  @media screen and (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;

// Styled Input for responsive form handling
export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;

  @media screen and (min-width: 576px) {
    height: 45px;
    padding: 12px;
  }

  @media screen and (min-width: 768px) {
    height: 50px;
    padding: 14px;
  }

  @media screen and (min-width: 1024px) {
    height: 55px;
    padding: 16px;
  }
`;


export const SelectedOptions = styled.p`
  font-size: 0.9rem;
  margin: 5px 0;
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 10px;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #000;
  padding: 5px;
  width: fit-content;
`;

export const QuantityLabel = styled.span`
  margin: 0 10px;
  font-size: 1rem;
`;

export const EditButton = styled.button`
  background-color: lightblue;
  border: none;
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #d1ecf1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`;

export const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeOut} 5s forwards;
`;

export const SuccessMessage = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const TickIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  &::before {
    content: '✔';
    font-size: 40px;
    color: white;
  }
`;

export const SuccessMessage_1 = styled.h2`
  background: linear-gradient(to right, #662D8C , #ED1E79);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 3px;
`;

export const RequiredField = styled.span`
  color: red;
  margin-left: 2px;
`;

export const OrderSummary = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-top: 2px solid black;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 1rem;
`;

export const DeliveryInfo = styled.span`
  font-size: 0.85rem;
  color: gray;
`;

export const PaymentOptionContainer = styled.div`
  border: 2px solid black;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? 'lightblue' : 'white')};

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;

export const PaymentOptionTitle = styled.h3`
  display: inline-block;
  margin: 0;
  font-size: 1.2rem;
  font-weight: normal;
`;

export const PaymentOptionDescription = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  background-color: ${({ isSelected }) => (isSelected ? '#e0f7ff' : 'transparent')};
  padding: 10px;
  margin-top: 5px;
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.3s ease;
`;

export const PaymentOptionCircle = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #000;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  background-color: ${({ isSelected }) => (isSelected ? '#3498db' : 'transparent')};
`;
