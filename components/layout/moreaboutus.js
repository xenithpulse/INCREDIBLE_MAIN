import React from 'react';
import { FaHardHat, FaTruck, FaHome } from 'react-icons/fa'; // Import relevant icons
import {
  Section,
  Container,
  BoxWithOutlineEffect,
  Logo,
  Heading,
  Description,
} from '@/components/styled/moreaboutus_sty';
import Center from '@/homecenter';

const MoreAboutUs = () => {
    const boxes = [
        {
          id: 1,
          logo: <FaHome size={50} />, // Design/Art icon
          heading: 'Driven by Design',
          description: "We're dedicated to curating and crafting pieces that enhance your living space with style and functionality."
        },
        {
          id: 2,
          logo: <FaHardHat size={50} />, // Construction/Build icon
          heading: 'Built to Last',
          description: 'We use high-quality materials and meticulous craftsmanship to ensure lasting durability in every product.',
        },
        {
          id: 3,
          logo: <FaTruck size={50} />, // Shipping/Delivery icon
          heading: 'Reliable Shipping',
          description: 'We partner with trusted carriers to provide reliable and timely delivery to your doorstep.',
        },
      ];

  return (
    <Section>
      <Container>
        {boxes.map((box) => (
            <BoxWithOutlineEffect key={box.id}>
            <Logo>{box.logo}</Logo>
            <Heading>{box.heading}</Heading>
            <Description>{box.description}</Description>
            </BoxWithOutlineEffect>
        ))}
      </Container>
    </Section>
  );
};

export default MoreAboutUs;
