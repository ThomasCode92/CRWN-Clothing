import Directory from './components/directory/directory.component';
import categoriesData from './categories.json';

const App = () => {
  const categories = [...categoriesData];

  return <Directory categories={categories} />;
};

export default App;
