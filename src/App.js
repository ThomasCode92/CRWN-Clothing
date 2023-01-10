import CategoryItem from './components/category-item/category-item.component';
import categoriesData from './categories.json';
import './categories.styles.scss';

const App = () => {
  const categories = [...categoriesData];

  return (
    <div className="categories-container">
      {categories.map(category => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default App;
