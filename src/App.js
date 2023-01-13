import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/signin/sign-in.component';
import Home from './routes/home/home.component';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
