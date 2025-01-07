import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/utils/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/utils/CartContext";
import BarsIcon from "@/components/icons/Bars";
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from "next/router";
import Image from "next/image";

// Styled component for the header
const StyledHeader = styled.header`
  background-color: #000000;
  height: 62px;
  position: fixed; /* Make header fixed */
  top: 0; /* Stick to the top */
  left: 0;
  z-index: 5; /* Ensure header is on top */
  width: 100%; /* Full width */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Optional: Add shadow for better visibility */
  transition: top 0.3s; /* Smooth transition when hiding/showing */
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;

  /* Responsive design for different screen sizes */
  @media screen and (max-width: 1200px) {
    font-size: 1.2rem; /* Adjust for tablet or medium devices */
  }

  @media screen and (max-width: 768px) {
    left: 50%;
    font-size: 1rem; /* Adjust font size for mobile */
    transform: translate(-50%, -50%);
  }

  @media screen and (max-width: 480px) {
    font-size: 0.7rem; /* Further reduce font size for very small devices */
  }
`;


// Wrapper for layout positioning
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// Cart wrapper for the cart icon and count
const CartWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;
  position: absolute;
  right: 30px; /* Right aligned on larger screens */
  top: 50%;
  transform: translateY(-50%);

  span {
    position: absolute;
    top: -10px;
    right: -10px;
    background: red;
    color: #ffffff;
    border-radius: 100%;
    padding: 3px 3px;
    font-size: 12px;
  }

  /* On mobile, keep cart on the right side */
  @media screen and (max-width: 768px) {
    right: 10px; /* Adjust cart to right for small screens */
  }

  svg {
    fill: #ffffff; /* Set cart icon color to white */
  }
`;

// Navigation menu styling
const StyledNav = styled.nav.withConfig({
  shouldForwardProp: (prop) => !['mobileNavActive'].includes(prop), // Filter out the mobileNavActive prop
})`
  ${({ mobileNavActive }) => mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  height: 100%;
  background-color: black;
  gap: 15px;
  position: fixed;
  top: 48px; /* Adjust top to be below the header */
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px; /* Padding to avoid content touching edges */
  z-index: 4; /* Make sure the nav is on top when active */

  /* Display flex for larger screens */
  @media screen and (min-width: 768px) {
    display: flex;
    position: static; /* Change to static positioning */
    padding: 0;
    justify-content: center;
    width: 100%;
    height: 62px;
  }
`;

// Navigation link styling
const NavLink = styled(Link)`
  display: block;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 15px;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 3px solid #FF0000;
  }

  /* Increase padding for larger screens */
  @media screen and (min-width: 768px) {
    padding: 20px;
    margin: 0.5px;
  }
`;

// Button for toggling mobile navigation
const NavButton = styled.button`
  background-color: transparent;
  width: 40px;
  height: 65px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3; /* Ensure button is above content */

  /* Hide button on larger screens */
  @media screen and (min-width: 768px) {
    display: none;
  }
`;


export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const router = useRouter();

  const handleAboutClick = async (e) => {
    e.preventDefault(); // Prevent default anchor behavior

    if (router.pathname === '/') {
      const aboutUsSection = document.getElementById('about-us');
      if (aboutUsSection) {
        aboutUsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      await router.push('/');
      setTimeout(() => {
        const aboutUsSection = document.getElementById('about-us');
        if (aboutUsSection) {
          aboutUsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/">
            <h2>INCREDIBLE HOMES</h2>
          </Logo>

          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/Shop">Shop</NavLink>
            <NavLink href="/" onClick={handleAboutClick}>About Us</NavLink>
          </StyledNav>

          {/* Button for toggling mobile navigation */}
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            {mobileNavActive ? <CloseIcon /> : <BarsIcon />} {/* Switch between bars and close icons */}
          </NavButton>

          {/* Cart wrapper (right side for both desktop and mobile) */}
          <CartWrapper>
            <Link href={'/cart'}>
              <ShoppingCartIcon />
              {/* Display number of products in cart */}
              <span>({cartProducts.length})</span>
            </Link>
          </CartWrapper>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}