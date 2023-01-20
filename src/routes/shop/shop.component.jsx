import shopData from '../../shop-data.json';

const SHOP_DATA = [...shopData];

const Shop = () => {
  return (
    <div>
      {SHOP_DATA.map(product => (
        <div key={product.id}>
          <h1>{product.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Shop;
