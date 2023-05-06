import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';
import Spinner from '../../components/spinner/spinner.component';

const GET_CATEGORY = gql`
  query ($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const Category = () => {
  const { category } = useParams();
  const { loading, data } = useQuery(GET_CATEGORY, {
    variables: { title: category },
  });

  useEffect(() => {
    if (!data) return;

    const { getCollectionsByTitle } = data;
    setProducts(getCollectionsByTitle.items);
  }, [data]);

  const [products, setProducts] = useState([]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
