import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  
  useEffect(() => {
    console.log("Running loading useEffect");
    if (ls) {
        const storedCart = JSON.parse(ls.getItem('cart')) || [];
        console.log("Loaded cart from localStorage:", storedCart);
        setCartProducts(storedCart);
    }
    setIsInitialized(true); // Set the flag after loading
}, []);


useEffect(() => {
  if (isInitialized) {
      console.log("Running saving useEffect");
      if (ls) {
          console.log("Saving cart to localStorage:", cartProducts);
          ls.setItem('cart', JSON.stringify(cartProducts));
      }
  }
}, [cartProducts, isInitialized]); // Add isInitialized to dependencies




  const areOptionsEqual = (options1, options2) => {
    return Object.keys(options1).length === Object.keys(options2).length &&
      Object.keys(options1).every(key => options1[key] === options2[key]);
  };

  useEffect(() => {
    console.log("cartProducts updated:", cartProducts);
}, [cartProducts]);

const addProduct = (productId, selectedOptions) => {
    console.log("Adding product:", productId, selectedOptions);
    setCartProducts((prev) => {
        const existingProductIndex = prev.findIndex(
            (item) =>
                item.productId === productId &&
                areOptionsEqual(item.selectedOptions, selectedOptions)
        );

        if (existingProductIndex > -1) {
            return prev.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: (item.quantity || 0) + 1 }
                    : item
            );
        } else {
            return [...prev, { productId, selectedOptions, quantity: 1 }];
        }
    });
};


  const removeProduct = (productId, selectedOptions) => {
    console.log("Removing product:", productId, "with options:", selectedOptions);
    
    if (productId && typeof productId === "string") {
      setCartProducts(prev => {
        const existingProductIndex = prev.findIndex(item => 
          item.productId === productId && areOptionsEqual(item.selectedOptions, selectedOptions)
        );

        console.log("Existing product index for removal:", existingProductIndex);

        if (existingProductIndex > -1) {
          const currentItem = prev[existingProductIndex];
          if (currentItem.quantity > 1) {
            console.log("Decrementing quantity for product:", currentItem);
            return prev.map((item, index) =>
              index === existingProductIndex
                ? {
                    ...item,
                    quantity: currentItem.quantity - 1
                  }
                : item
            );
          } else {
            console.log("Removing product from cart:", currentItem);
            return prev.filter((item, index) => index !== existingProductIndex);
          }
        } else {
          console.error("Product not found in cart for productId:", productId);
          return prev; 
        }
      });
    } else {
      console.error("Invalid productId provided:", productId);
    }
  };

  const clearCart = () => {
    setCartProducts([]);
    if (ls) {
        ls.removeItem('cart');
    }
};


  return (
    <CartContext.Provider value={{ cartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
