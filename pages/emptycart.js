import styled from 'styled-components';
import { useRouter } from 'next/router';
import Center from '@/homecenter';
import Button from '@/components/styled/CustomButton';

const Container = styled.div`
  background-color: #fff;
  text-align: center;
  font-family: 'Calibri', sans-serif !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px); /* Center vertically within the viewport */
  padding: 20px; /* Add padding for smaller screens */
`;

const Card = styled.div`
  margin: 0 auto;
  border: 0;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  border-radius: 8px;
  box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, 0.05);
  max-width: 400px;
  width: 90%; /* Ensure the card scales well on smaller screens */
`;

const CardBody = styled.div`
  padding: 30px;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 20px; /* Reduce padding for tablets */
  }

  @media (max-width: 480px) {
    padding: 15px; /* Reduce padding for smaller devices */
  }
`;

const EmptyCartImage = styled.img`
  width: 130px;
  height: 130px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px; /* Scale down the image for tablets */
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px; /* Scale down the image for smaller devices */
  }
`;

const EmptyCartTitle = styled.h3`
  font-weight: bold;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem; /* Adjust title size for tablets */
  }

  @media (max-width: 480px) {
    font-size: 1rem; /* Adjust title size for smaller devices */
  }
`;

const EmptyCartMessage = styled.h4`
  color: #555;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Adjust message size for tablets */
  }

  @media (max-width: 480px) {
    font-size: 0.8rem; /* Adjust message size for smaller devices */
  }
`;

export default function EmptyCart() {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push('/'); 
  };

  return (
    <Center>
      <Container>
        <Card>
          <CardBody>
            <div className="empty-cart-cls">
              <EmptyCartImage
                src="https://img.icons8.com/nolan/512/1A6DFF/C822FF/clear-shopping-cart.png"
                alt="Empty Cart"
              />
              <EmptyCartTitle>Your Cart is Empty</EmptyCartTitle>
              <EmptyCartMessage>Add something to make me happy :)</EmptyCartMessage>
              <Button
                block
                gradient="linear-gradient(to left top, #59B8F4, #1A6DFF, #C822FF)"
                gradientHover="linear-gradient(to top right, #000, #000)"
                radius="full"
                onClick={handleContinueShopping}
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  height: "48px",
                }}
              >
                Continue Shopping
              </Button>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Center>
  );
}
