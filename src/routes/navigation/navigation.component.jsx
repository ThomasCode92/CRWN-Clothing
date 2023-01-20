import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';

import { signOutAuthUser } from '../../utils/firebase/firebase.util';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutAuthUser();
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
      </div>
      <CartDropdown />
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
