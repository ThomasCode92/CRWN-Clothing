import { createContext, useEffect, useState } from 'react';

import {
  addCollectionAndDocuments,
  getCollectionAndDocuments,
} from '../utils/firebase/firebase.util';
import SHOP_DATA from '../shop-data.json';

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCollectionAndDocuments('categories');
      console.log(categoryMap);
    };

    addCollectionAndDocuments('categories', SHOP_DATA);
    getCategoriesMap();
  }, []);

  const value = products;

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
