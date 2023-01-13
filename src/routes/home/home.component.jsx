import Directory from '../../components/directory/directory.component';
import categoriesData from '../../categories.json';

const Home = () => {
  const categories = [...categoriesData];

  return (
    <div>
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
