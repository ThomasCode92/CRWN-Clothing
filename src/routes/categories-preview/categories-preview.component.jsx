import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/category-preview/category-preview.component';

import { selectCategoriesMap } from '../../store/categories/category.selector';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map(categoryTitle => {
        const products = categoriesMap[categoryTitle];
        return (
          <CategoryPreview
            key={categoryTitle}
            title={categoryTitle}
            products={products}
          />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
