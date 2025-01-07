import Header from "@/components/layout/Headertwo";
import Center from "@/homecenter";
import Button from "@/components/styled/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/utils/CartContext";
import axios from "axios";
import Table from "@/components/utils/Table";
import { useRouter } from "next/router";
import { keyframes } from "styled-components";
import Image from 'next/image'
import Title from "@/components/styled/Title";
import EmptyCart from "./emptycart";

import { 
  ColumnsWrapper,
  Box,
  ProductInfoCell,
  ProductImageBox,
  ProductDetails,
  ProductTitle,
  SelectedOptions,
  ControlsContainer,
  QuantityControl,
  QuantityLabel,
  SuccessOverlay,
  SuccessMessage,
  TickIcon,
  SuccessMessage_1,
  ErrorMessage,
  RequiredField,
  OrderSummary,
  SummaryItem,
  DeliveryInfo,
  Input,
} from '@/components/styled/cart';
import AnnouncementBar from "@/components/layout/announcementbar";


export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const [error, setError] = useState('');
  

  
  const totalOriginalPrice = cartProducts.reduce((acc, cartItem) => {
    const product = products.find(p => p.productId === cartItem.productId);
  
    if (!product) {
      return acc; // Skip this item if the product is not found
    }
  
    const priceMatch = cartItem.selectedOptions.Dimensions?.match(/\(PKR\s([\d,.]+)\)/);
    const originalPrice = priceMatch ? parseFloat(priceMatch[1].replace(",", "")) : product.price;
  
    return acc + originalPrice * cartItem.quantity;
  }, 0);
  
  const itemsTotal = cartProducts.reduce((acc, cartItem) => {
    const product = products.find(p => p.productId === cartItem.productId);
  
    if (!product) {
      return acc; // Skip this item if the product is not found
    }
  
    const priceMatch = cartItem.selectedOptions.Dimensions?.match(/\(PKR\s([\d,.]+)\)/);
    const originalPrice = priceMatch ? parseFloat(priceMatch[1].replace(",", "")) : product.price;
  
    const discountedPercentage = typeof product.discounted_percentage === 'number' ? product.discounted_percentage : 0;
    const discountAmount = (originalPrice * discountedPercentage) / 100;
    const basePrice = Math.round(originalPrice - discountAmount);
  
    const itemTotal = basePrice * cartItem.quantity;
    return acc + itemTotal;
  }, 0);
  
  const shopDiscount = totalOriginalPrice - itemsTotal; // This is the shop discount
  
  

  // Fetch the product details based on cart products
  useEffect(() => {
    const formattedCartProducts = cartProducts.map(product => ({
      productId: product.productId,
      selectedOptions: product.selectedOptions || {},
    }));

    if (formattedCartProducts.length > 0) {
      axios.post('/api/cart', { ids: formattedCartProducts })
        .then(response => {
          setProducts(response.data); // Set full product details
        })
        .catch(error => {
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      // Clear cart from context and local storage
      clearCart();
      localStorage.removeItem('cartProducts');
    }
  }, [clearCart]); // added clearCart as a dependency


  const validateInputs = () => {
    const newErrors = {};
  
    // Name validation
    if (!name) {
      newErrors.name = 'Name is required';
    }
  
    // Email validation (basic email format)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
  
    // City validation
    if (!city) {
      newErrors.city = 'City is required';
    }
  
    // Phone validation (example for 10-digit phone number)
    const phonePattern = /^[0-9]{11}$/; // Adjust the pattern as per your needs
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phonePattern.test(phone)) {
      newErrors.phone = 'Enter a valid phone number (12 digits)';
    }
  
    // Street Address validation
    if (!streetAddress) {
      newErrors.streetAddress = 'Street address is required';
    }
  
    // Country validation
    if (!country) {
      newErrors.country = 'Country is required';
    }
  
    // Set the errors state
    setErrors(newErrors);
  
    // If no errors, return true (form is valid)
    return Object.keys(newErrors).length === 0;
  };
  

  const moreOfThisProduct = (productId, selectedOptions) => {
    addProduct(productId, selectedOptions);
    
  };

  const lessOfThisProduct = (productId, selectedOptions) => {
    removeProduct(productId, selectedOptions);
};


  const goToPayment = async () => {
    if (validateInputs()) {

      try {
        const response = await axios.post('/api/checkout', {
          name,
          email,
          city,
          phone,
          streetAddress,
          country,
          cartProducts,
        });
  
        if (response.data.success) {
          clearCart();
          setIsSuccess(true);
          localStorage.removeItem('cartProducts');
          setTimeout(() => {
            router.push('/');
          }, 5000);
        } else {
          console.error("Order placement failed:", response.data.message);
        }
      } catch (error) {
        console.error("Checkout error:", error);
      }
    } else {
      console.error("Input validation failed");
    }
  };
  
  


if (isSuccess) {
  return (
    <SuccessOverlay>
      <SuccessMessage>
        <TickIcon />
        <SuccessMessage_1>Thanks for your order</SuccessMessage_1>
        <p>Soon, You will receive a call for order confirmation</p>
      </SuccessMessage>
    </SuccessOverlay>
  );
}

  let total = 0;


  cartProducts.forEach(cartItem => {
    const product = products.find(p => p.productId === cartItem.productId);
    if (product) {
      const priceMatch = cartItem.selectedOptions.Dimensions?.match(/\(PKR\s([\d,.]+)\)/);
      const originalPrice = priceMatch ? parseFloat(priceMatch[1].replace(",", "")) : product.price;
      const discountedPercentage = typeof product.discounted_percentage === 'number' ? product.discounted_percentage : 0;
      const discountAmount = (originalPrice * discountedPercentage) / 100;
      const price = Math.round(originalPrice - discountAmount);
      total += price * cartItem.quantity;
    }
  });

  const ResponsiveDiv = () => {
    const [marginTop, setMarginTop] = useState('3%'); // Default marginTop
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 480) {
          setMarginTop('16%'); // Adjust margin for very small screens (e.g., small phones)
        } else if (window.innerWidth <= 640) {
          setMarginTop('13%'); // Adjust margin for small screens (mobile)
        } else if (window.innerWidth <= 768) {
          setMarginTop('7%'); // Adjust margin for tablets in portrait mode
        } else if (window.innerWidth <= 1024) {
          setMarginTop('4%'); // Adjust margin for tablets and smaller laptops
        } else if (window.innerWidth <= 1440) {
          setMarginTop('3%'); // Adjust margin for large screens (small desktops)
        } else if (window.innerWidth <= 1600) {
          setMarginTop('3%'); // Adjust margin for medium-sized desktops
        } else {
          setMarginTop('3%'); // Default margin for larger devices (large desktops)
        }
      };
  
      // Add event listener to handle resize
      window.addEventListener('resize', handleResize);
  
      // Initial call to set marginTop based on initial window size
      handleResize();
  
      // Clean up the event listener
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
      <div style={{ marginTop }}>
        <AnnouncementBar 
          messages={[
            "We will call you soon to confirm the order",
            "Free shipping all over Pakistan!"
          ]}/>
      </div>
    );
  };
  
  
  

  return (
    <>
    <div style={{  overflowX: "hidden" }}>
      <Header />
      <ResponsiveDiv />
      </div>
      <Center>
        {/* Render the EmptyCart outside the ColumnsWrapper when the cart is empty */}
        {!cartProducts?.length ? (
          <EmptyCart />
        ) : (
          <ColumnsWrapper>
            <Box>
              <Title style={{marginTop:"5%"}}>Cart</Title>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((cartItem, index) => {
                    const product = products.find(p => p.productId === cartItem.productId);
                    if (!product) {
                      console.error("Product not found for cart item with productId:", cartItem.productId);
                      return null;
                    }
  
                    const quantity = cartItem.quantity || 1;
                    console.log(quantity)
                    const priceMatch = cartItem.selectedOptions.Dimensions?.match(/\(PKR\s([\d,.]+)\)/);
                    const price_yet = priceMatch ? parseFloat(priceMatch[1].replace(",", "")) : product.price;
                    const price = price_yet 
  
                    return (
                      <tr key={index}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.title}
                                width={500} // Set appropriate width
                                height={500} // Set appropriate height
                                layout="responsive" // You can adjust layout as needed
                              />
                            ) : (
                              <span>No image available</span>
                            )}
                          </ProductImageBox>
                          <ProductDetails>
                            <ProductTitle style={{ overflow: "hidden", textOverflow: 'ellipsis' }}>
                              {product.title.length > 50 ? product.title.slice(0, 50) + "..." : product.title}
                            </ProductTitle>
                            <SelectedOptions>
                              Dimension: {cartItem.selectedOptions.Dimensions?.split(' ')[0]}<br />
                              Color: {cartItem.selectedOptions?.Colors}
                            </SelectedOptions>
                            <ControlsContainer>
                              <QuantityControl>
                                <Button onClick={() => lessOfThisProduct(cartItem.productId, cartItem.selectedOptions)}>-</Button>
                                <QuantityLabel>{quantity}</QuantityLabel>
                                <Button onClick={() => moreOfThisProduct(cartItem.productId, cartItem.selectedOptions)}>+</Button>
                              </QuantityControl>
                            </ControlsContainer>
                          </ProductDetails>
                        </ProductInfoCell>
                        <td>PKR {price.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
  
              {/* Order Summary Section */}
              <OrderSummary>
                <SummaryItem>
                  <span>Item(s) total:</span>
                  <span>PKR {totalOriginalPrice.toFixed(2)}</span>
                </SummaryItem>
  
                <SummaryItem>
                  <span>Shop discount:</span>
                  {itemsTotal >= 5000 ? (
                    <span>-PKR {shopDiscount.toFixed(2)}</span>
                  ) : (
                    <span>PKR 0.00</span>
                  )}
                </SummaryItem>
  
                <SummaryItem>
                  <span>Subtotal:</span>
                  <span>
                    PKR {(totalOriginalPrice - shopDiscount).toFixed(2)}
                  </span>
                </SummaryItem>
  
                <SummaryItem>
                  <span>Delivery:</span>
                  <span>
                      <>FREE <DeliveryInfo>(Pakistan)</DeliveryInfo></>
                  </span>
                </SummaryItem>
  
                <SummaryItem>
                  <strong>Total ({cartProducts.length} item{cartProducts.length > 1 ? 's' : ''}):</strong>
                  <strong>
                    PKR {(itemsTotal).toFixed(2)}
                  </strong>
                </SummaryItem>
              </OrderSummary>
            </Box>
  
            {!!cartProducts?.length && (
              <Box>
                <Title>Order Information</Title>
                <label>
                  Name<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
  
                <label>
                  Email<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
  
                <label>
                  City<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
                {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
  
                <label>
                  Phone<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
  
                <label>
                  Street Address<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                {errors.streetAddress && <ErrorMessage>{errors.streetAddress}</ErrorMessage>}
  
                <label>
                  Country<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
  
                <ProductTitle><strong>Just Click on Complete Order Button</strong></ProductTitle>
                <p><strong>We will contact you soon ourselves for Payment Method.</strong></p>
  
                {error && <ErrorMessage>{error}</ErrorMessage>}
  
                <Button
                  black
                  block
                  onClick={goToPayment}
                  style={{ width: "100%", maxWidth: "600px", height: "48px" }}
                >
                  Complete Order
                </Button>
              </Box>
            )}
          </ColumnsWrapper>
        )}
      </Center>
    </>
  );
}  

