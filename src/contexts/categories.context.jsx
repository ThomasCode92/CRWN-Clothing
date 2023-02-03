import { createContext, useEffect, useState } from 'react';

import {
  addCollectionAndDocuments,
  getCollectionAndDocuments,
} from '../utils/firebase/firebase.util';
import SHOP_DATA from '../shop-data.json';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCollectionAndDocuments('categories');
      console.log(categoryMap);

      setCategoriesMap(categoryMap);
    };

    addCollectionAndDocuments('categories', SHOP_DATA);
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
