import { useDispatch } from 'react-redux';

import Button from '../button/button.component';
import './product-card.styles.scss';

import { addItemToCart } from '../../store/cart/cart.reducer';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { name, price, imageUrl } = product;

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button onClick={addToCartHandler} buttonType="inverted">
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
