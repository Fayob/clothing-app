import React, { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase'
// import { UserContext } from '../../context/user.context'
import FormInput from '../form-input/form-input'
import Button from '../button/button'
import './sign-up-form.scss'

const defaultFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFormField)
  const { displayName, email, password, confirmPassword } = formField

  // const { setCurrentUser } = useContext(UserContext)
  
  const handleChange = (event) => {
    const { name, value } = event.target
    
    setFormField({...formField, [name]: value})
  }

  const resetFormField = () => {
    setFormField(defaultFormField)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('password do not match')
      return 
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { 
        displayName
      })
      // setCurrentUser(user)
      resetFormField()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      } else {
        console.log('User creation encounter an error', error);
      }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an Account?</h2>
      <span>Sign up with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />
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
        <FormInput
          label='Confirm Password'
          type="password"
          id='name'
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <Button>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm