import Center from "@/components/products/productpagecenter";
import Header from "@/components/layout/Headertwo";
import ImageCarousel from "@/components/styled/ImageCarousel"; // Updated ImageCarousel component
import Button from "@/components/styled/CustomButton";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/utils/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import Footer from "@/components/layout/footer";
import FacebookPixel from '@/components/utils/FacebookPixel'; // Import the new FacebookPixel component
import OtherProdSection from "../../components/utils/OtherProd";
import { PageWrapper,
  ProductInfo,
  Title,
  PriceSection,
  Description,
  SelectWrapper,
  StyledSelect,
  AddToCartSection,
  ShippingInfo,
  ReturnsInfo,
  RequiredField,
  ErrorMessage,
  PropertyTitle,
  MessageContainer,
  } from "../../components/styled/page_styled";
import { generateProductSEO } from "@/components/utils/seo.config";

export default function ProductPage({ product, similarProducts }) {
  const { addProduct } = useContext(CartContext);
  const seoData = generateProductSEO(product);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errors, setErrors] = useState({});
  const [price, setPrice] = useState(product.price);
  const [showMessage, setShowMessage] = useState(false);

  const Pixel_ID = process.env.META_API


  const handleOptionChange = (propertyName, value) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [propertyName]: value,
    }));

    if (propertyName.toLowerCase() === "dimensions") {
      const selectedOption = value;
      const priceMatch = selectedOption.match(/\(PKR\s([\d,.]+)\)/);
      if (priceMatch) {
        setPrice(priceMatch[1].replace(",", ""));
      }
    }
  };
  const discountAmount = (price * product.discounted_percentage) / 100;
  const discountedPrice = Math.round(price - discountAmount);
  
// Render the price display with discount details
const renderPriceSection = () => {
  // Calculate the discounted price
  const discountAmount = (price * product.discounted_percentage) / 100;
  const discountedPrice = Math.round(price - discountAmount);

  return (
    <PriceSection>
      {product.discounted_percentage ? (
        <>
          <span style={{ color: 'green', fontWeight: 'bold' }}>
            PKR {discountedPrice}
          </span>
          <span
            style={{
              textDecoration: 'line-through',
              marginLeft: '10px',
              fontSize: '0.5em',
              color: 'grey',
            }}
          >
            PKR {price}
          </span>
          <span
  style={{
    display: 'inline-block',
    padding: '5px 14px',
    marginLeft: '10px',
    fontSize: '0.7em',
    color: 'white',
    backgroundColor: 'green',
    borderRadius: '12px',
    fontWeight: 'normal',
  }}
>
  {product.discounted_percentage}% off
</span>

        </>
      ) : (
        <>PKR {price}</>
      )}
    </PriceSection>
  );
};



  const handleAddToCart = () => {
    const newErrors = {};

    if (product.properties && Object.keys(product.properties).length > 0) {
      Object.keys(product.properties).forEach((propertyName) => {
        if (!selectedOptions[propertyName]) {
          newErrors[propertyName] = 'Please select an option';
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      addProduct(product._id, selectedOptions);
      setShowMessage(true);

      // Track 'AddToCart' event without re-initializing
      if (typeof window !== 'undefined') {
        import('react-facebook-pixel').then((module) => {
          const ReactPixel = module.default;
          ReactPixel.track('AddToCart', {
            content_name: product.title,
            value: discountedPrice,
            currency: 'PKR',
          });
        });
      }

      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  const handleAddToBuy = () => {
    const newErrors = {};

    if (product.properties && Object.keys(product.properties).length > 0) {
      Object.keys(product.properties).forEach((propertyName) => {
        if (!selectedOptions[propertyName]) {
          newErrors[propertyName] = 'Please select an option';
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      addProduct(product._id, selectedOptions);

      // Redirect to cart page and track the event
      if (typeof window !== 'undefined') {
        import('react-facebook-pixel').then((module) => {
          const ReactPixel = module.default;
          ReactPixel.track('Buy Now', {
            content_name: product.title,
            value: discountedPrice,
            currency: 'PKR',
          });

          window.location.href = '/cart';
        });
      }
    }
  };


  const getFormattedDescription = () => {
    const highlights = [];
    let remainingDescription = product.description || "";

    const firstHighlightIndex = remainingDescription.indexOf("•");
    let normalDescription = "";

    if (firstHighlightIndex !== -1) {
      normalDescription = remainingDescription.slice(0, firstHighlightIndex).trim();
      remainingDescription = remainingDescription.slice(firstHighlightIndex).trim();
    } else {
      normalDescription = remainingDescription;
      remainingDescription = "";
    }

    while (remainingDescription.includes("•")) {
      const start = remainingDescription.indexOf("•");
      const nextHighlight = remainingDescription.indexOf("•", start + 1);

      let end;
      if (nextHighlight !== -1) {
        end = nextHighlight;
      } else {
        end = remainingDescription.length;
      }

      highlights.push(remainingDescription.slice(start, end).trim());
      remainingDescription = remainingDescription.slice(end).trim();
    }

    return (
      <>
        {normalDescription && <p>{normalDescription}</p>}
        {highlights.map((highlight, idx) => (
          <span key={idx} className="highlight">
            {highlight}
          </span>
        ))}
        {remainingDescription && <p>{remainingDescription}</p>}
      </>
    );
  };

  const currentDate = new Date();
  const estimatedShippingStart = new Date(currentDate);
  estimatedShippingStart.setDate(currentDate.getDate() + 1);

  const shippingDateStart = estimatedShippingStart.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

  const shippingDateEnd = new Date(estimatedShippingStart);
  shippingDateEnd.setDate(estimatedShippingStart.getDate() + 4);

  const shippingDateEndFormatted = shippingDateEnd.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

  return (
    <>
      <seoData {...seoData} />
      <Header />
      <Center>
        <PageWrapper>
          <ImageCarousel images={product.images || []} />
          <ProductInfo>
            <Title>{product.title}</Title>
            {renderPriceSection()} {/* Display dynamic price with discount */}
            <ShippingInfo>
              Arrives between {shippingDateStart} to {shippingDateEndFormatted}.
            </ShippingInfo>
            <ReturnsInfo>Delivery all over Pakistan.</ReturnsInfo>
            <Description>{getFormattedDescription()}</Description>
            <SelectWrapper>
              {product.properties &&
                Object.keys(product.properties).map((propertyName, idx) => (
                  <div key={idx}>
                    <PropertyTitle>
                      {propertyName}
                      <RequiredField>*</RequiredField>
                    </PropertyTitle>
                    <StyledSelect
                      value={selectedOptions[propertyName] || ""}
                      hasError={!!errors[propertyName]}
                      onChange={(e) =>
                        handleOptionChange(propertyName, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {product.properties[propertyName]?.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </StyledSelect>
                    {errors[propertyName] && (
                      <ErrorMessage>{errors[propertyName]}</ErrorMessage>
                    )}
                  </div>
                ))}
            </SelectWrapper>
            <AddToCartSection>
              <Button
                block
                gradient="linear-gradient(to top right, #000, #000)"
                gradientHover="linear-gradient(to top right, #000, #000)"
                radius="full"
                onClick={handleAddToCart}
                style={{ width: "100%", maxWidth: "600px", height: "48px" }}
              >
                Add to cart
              </Button>
  
              <Button
                block
                gradient="linear-gradient(to top right, #000, #000)"
                gradientHover="linear-gradient(to top right, #000, #000)"
                radius="full"
                onClick={handleAddToBuy}
                style={{ width: "100%", maxWidth: "600px", height: "48px" }}
              >
                Buy Now
              </Button>
            </AddToCartSection>
  
            {/* Display the message */}
            {showMessage && (
              <MessageContainer>
                Item added to cart
              </MessageContainer>
            )}
          </ProductInfo>
        </PageWrapper>

        <OtherProdSection products={similarProducts} />
      </Center>
      {/* Display similar products section */}
      <Footer />
      <FacebookPixel pixelId="1102422468084127" /> {/* Add Facebook Pixel component */}
    </>
  );
}


export async function getServerSideProps(context) {
  await mongooseConnect();
  const { slug } = context.query;

  try {
    // Find the current product by slug
    const product = await Product.findOne({ slug }).populate('category').lean(); // Use findOne with slug

    if (!product) {
      return {
        notFound: true,
      };
    }

    // Fetch up to 12 similar products from the same category, excluding the current product
    const similarProducts = await Product.find({
      category: product.category?._id,
      slug: { $ne: product.slug }, // Exclude current product by slug
    }).limit(12).lean(); // Use lean() for better performance

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        similarProducts: JSON.parse(JSON.stringify(similarProducts)),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        error: "Failed to fetch product data.", // Provide an error message
      },
    };
  }
}