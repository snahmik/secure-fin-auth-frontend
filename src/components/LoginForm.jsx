import React, {useEffect, useState} from 'react';
import {Form, redirect, useActionData, useNavigation} from "react-router";
import UserInput from "./UserInput.jsx";
import Button from "./Button.jsx";
import store, {authActions} from "../store/index.js";
import {validateEmail, validatePassword} from "../utils/formValidationUtils.js";
import {loginUser} from "../api/authApi.js";

const LoginForm = ({method}) => {
  const formActionData = useActionData()
  const navigation = useNavigation()
  const [emailErrors, setEmailErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

  const isSubmitting = navigation.state !== 'idle'

  useEffect(() => {
    setEmailErrors([])
    setPasswordErrors([])

    if (!formActionData?.error) {
      return
    }

    formActionData.error.forEach((error) => {
      if (error.type === 'email') {
        setEmailErrors((prevState) => [
          ...prevState,
          error.message
        ])
      }

      if (error.type === 'password') {
        setPasswordErrors((prevState) => [...prevState, error.message])
      }

      if (error.type === 'auth') {
        setEmailErrors((prevState) => [...prevState, error.message])
        setPasswordErrors((prevState) => [...prevState, error.message])
      }
    })
  }, [formActionData])

  return (
    <Form method={method}
          className='flex flex-col gap-4 items-center'>
      <UserInput label="email"
                 type='text'
                 name='email'
                 placeholder='Enter your email'
                 errorMessages={emailErrors}
                 onChange={() => {
                   setEmailErrors([])
                 }}/>
      <UserInput label="password"
                 type='password'
                 name='password'
                 placeholder='Enter your password'
                 errorMessages={passwordErrors}
                 onChange={() => {
                   setPasswordErrors([])
                 }}/>
      <div className='my-2 w-3/5'>
        <Button label={isSubmitting ? 'Processing...' : 'Login'}
                isPrimary={true}
                isOnPrimary={false}
                disabled={isSubmitting}
                size={'md'}/>
      </div>
    </Form>
  );
};

export default LoginForm;

export async function formAction({request}) {
  const formData = await request.formData();

  const email = formData.get('email')
  const password = formData.get('password')

  let error = []

  error.push(...validateEmail(email))
  error.push(...validatePassword(password, true))

  if (error.length > 0) {
    return {
      success: false,
      error
    }
  }

  try {
    const res = await loginUser(email, password)

    if (!res.success) {
      return {success: false, error: [{type: res.error.type, message: res.error.message}]}
    }

    const {id, accountNumber, role} = res.data.user

    store.dispatch(authActions.authenticate({userId: id, accountNumber: accountNumber, role: role}))

    if (role === 'admin') {
      return redirect('/admin')
    }

    return redirect(`/user`)
  } catch (e) {
    return {success: false, error: [{type: 'auth', message: 'An unexpected error occurred'}]}
  }
}

