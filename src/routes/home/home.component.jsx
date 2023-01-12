import Directory from '../../components/directory/directory.component';
import categoriesData from '../../categories.json';

const Home = () => {
  const categories = [...categoriesData];

  return <Directory categories={categories} />;
};

export default Home;
