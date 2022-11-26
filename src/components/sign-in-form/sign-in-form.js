import React, { useState } from 'react'
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase'
// import { UserContext } from '../../context/user.context'
import FormInput from '../form-input/form-input'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button'
import './sign-in-form.scss'

const defaultFormField = {
  password: '',
  email: '',
}

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFormField)
  const { password, email } = formField
  
  // const {setCurrentUser} = useContext(UserContext)

  const handleChange = (event) => {
    const { name, value } = event.target
    
    setFormField({...formField, [name]: value})
  }

  const resetFormField = () => {
    setFormField(defaultFormField)
  }

  const signInWIthGoogle = async () => {
    await signInWithGooglePopup()
    // const { user } = await signInWithGooglePopup()
    // await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)
      // setCurrentUser(user);
      resetFormField()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect Email and Password')
          break;
        case 'auth/user-not-found':
          alert('No user associate with this email')
          break;
        default: console.log(error);
      }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an Account?</h2>
      <span>Sign up with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label='Password'
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' onClick={signInWIthGoogle} buttonType='google'>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm