import { Fragment, useContext } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './shop.styles.scss';

const Shop = () => {
  const categoriesMap = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map(categoryTitle => (
        <Fragment key={categoryTitle}>
          <h2>{categoryTitle}</h2>
          <div className="products-container">
            {categoriesMap[categoryTitle].map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Shop;
