import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';

import { fetchCategoriesStart } from '../../store/categories/category.reducer';

import { addCollectionAndDocuments } from '../../utils/firebase/firebase.util';
import SHOP_DATA from '../../shop-data.json';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA);
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
