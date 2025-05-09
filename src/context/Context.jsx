import { createContext, useContext, useReducer } from "react";
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
    const products = [...Array(20)].map(() => ({
        id: faker.string.uuid(),          // Changed from datatype.uuid()
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),         // Changed from random.image()
        inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),  // Changed from random.arrayElement()
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

// Change the CartState export to be more explicit
export const useCart = () => {
    const context = useContext(Cart);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  };
  
  // Rename default export for clarity
  export const CartProvider = Context;
