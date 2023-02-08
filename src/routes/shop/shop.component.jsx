import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';

import { setCategories } from '../../store/categories/category.action';

import {
  addCollectionAndDocuments,
  getCollectionAndDocuments,
} from '../../utils/firebase/firebase.util';
import SHOP_DATA from '../../shop-data.json';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCollectionAndDocuments('categories');
      console.log(categoriesArray);

      const action = setCategories(categoriesArray);
      dispatch(action);
    };

    addCollectionAndDocuments('categories', SHOP_DATA);
    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
