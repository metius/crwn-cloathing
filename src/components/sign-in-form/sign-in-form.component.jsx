import {useState} from 'react';

import { useDispatch } from 'react-redux';
import {googleSignInStart, emailSignInStart} from '../../store/user/user.action';

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import {SignInContainer, ButtonsContainer} from './sign-in-form.styles'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // await signInAuthUserWithEmailAndPassword(email, password);
      dispatch(emailSignInStart(email, password))

      resetFormFields();
      
    } catch(error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect username and/or password');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;  
        default:
          console.log(error)      
      }
    }
  }
  
  const handleChange = (event) => {
    const {value, name} = event.target;

    setFormFields({
      ...formFields, 
      [name]: value
    });
  }

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Email'
          type="email" 
          required 
          onChange={handleChange} 
          name='email' 
          value={email}
        />

        <FormInput 
          label='Password'
          type="password" 
          required 
          onChange={handleChange} 
          name='password' 
          value={password}
        />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
        </ButtonsContainer>
        
      </form>
    </SignInContainer>
  )
}

export default SignInForm;