import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button.component';
import './product-card.styles.scss';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

const ProductCard = ({ product }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const { name, price, imageUrl } = product;

  const addToCartHandler = () => {
    dispatch(addItemToCart(cartItems, product));
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
