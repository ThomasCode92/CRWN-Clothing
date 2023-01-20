import { useContext, useState } from 'react';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { UserContext } from '../../contexts/user.context';

import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.util';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { setCurrentUser } = useContext(UserContext);

  const { email, password } = formFields;

  const changeHandler = event => {
    const { name, value } = event.target;

    setFormFields(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const submitHandler = async event => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        default:
          alert('An unexpected error occurred');
          console.log(error);
      }
    }

    resetFormFields();
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label={'Email'}
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
          required
        />
        <FormInput
          label={'Password'}
          type="password"
          name="password"
          value={password}
          onChange={changeHandler}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
