import { createContext, useState, useEffect } from 'react';

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);

  //here I will get the data from Firestore and assign to state/context
  // useEffect();

  const value = { products };
  return(
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
};

