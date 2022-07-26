import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  onAuthStateChangedListener,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch()

  const resetFormFields = () => {
    // setFormFields(defaultFormFields);
  };
  // console.log(window.location)
  const navigate=useNavigate()
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    navigate('/shop')
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await (email, password);
      // resetFormFields();
      // dispatch({type:'SET_CURRENT_USER',payload:user.user})
    } catch (error) {
      console.log('user sign in failed' + error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            {/* <div  style={{whiteSpace: "normal" , wordWrap: "break-word"}}> */}

            Sign In With Google
            {/* </div> */}
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
