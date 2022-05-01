import {useState} from 'react';
import {signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);

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
    <div className='sign-in-container'>
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

        <div className='buttons-container'>
          <Button type="submit">Sign In</Button>
          <Button tyoe="button" onClick={signInWithGoogle} buttonType='google'>Google Sign In</Button>
        </div>
        
      </form>
    </div>
  )
}

export default SignInForm;