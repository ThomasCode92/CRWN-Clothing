import { createContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const COLLECTIONS = gql`
  query {
    collections {
      id
      title
      items {
        id
        name
        imageUrl
        price
      }
    }
  }
`;

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  const { loading, data } = useQuery(COLLECTIONS);

  useEffect(() => {
    if (!data) return;

    const { collections } = data;
    const collectionsMap = collections.reduce((acc, collection) => {
      const { title, items } = collection;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    setCategoriesMap(collectionsMap);
  }, [data]);

  console.log('loading', loading);
  console.log('data', data);

  const value = { categoriesMap, loading };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
