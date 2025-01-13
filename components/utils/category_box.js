import styled from 'styled-components';
import NavLink from 'next/link';
import Center from "@/homecenter";
import Title from '../styled/Title';
import Image from 'next/image'; // Import Next.js Image

// Styled grid for categories with responsiveness
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-left: 0px;
  margin-right: 10px;
  box-shadow: 0;
  transform: scale(1);
  transition: box-shadow 0.3s, transform 0.3s ease-in-out;
  width: 100%;
  box-sizing: border-box;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Styled category square for each item
const CategorySquare = styled(NavLink)`
  display: block;
  width: 100%;
  position: relative;
  cursor: pointer;
  height: 150px;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0;
  transform: scale(1);
  transition: box-shadow 0.3s, transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media screen and (min-width: 768px) {
    height: 300px;
  }
`;

// Styled overlay for category
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

// Category title text style
const CategoryTitle = styled.h2`
  color: white;
  font-size: 27px;
  font-weight: bold;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;

export default function CategoryBox({ categories, loading }) {
  return (
    <Center>
      <Title>Categories</Title>
      <CategoryGrid>
        {categories &&
          categories.map((category) => (
            <CategorySquare
              href={`/category/${encodeURIComponent(category.name)}`}
              key={category._id}
              passHref
            >
              <CategoryImage>
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                />
                <Overlay />
                <CategoryTitle>{category.name}</CategoryTitle>
              </CategoryImage>
            </CategorySquare>
          ))}
      </CategoryGrid>
    </Center>
  );
}

// Styled category image using Next.js Image
const CategoryImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .next-image {
    position: absolute !important;
  }
`;
