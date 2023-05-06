import { Fragment, useContext } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

const CategoriesPreview = () => {
  const { categoriesMap, loading } = useContext(CategoriesContext);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map(categoryTitle => {
          const products = categoriesMap[categoryTitle];
          return (
            <CategoryPreview
              key={categoryTitle}
              title={categoryTitle}
              products={products}
            />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
