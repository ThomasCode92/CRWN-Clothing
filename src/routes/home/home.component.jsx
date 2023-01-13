import { Outlet } from 'react-router-dom';
import Directory from '../../components/directory/directory.component';
import categoriesData from '../../categories.json';

const Home = () => {
  const categories = [...categoriesData];

  return (
    <div>
      <Outlet />
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
