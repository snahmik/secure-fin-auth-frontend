import React, {useEffect, useState} from 'react';
import {Form, useActionData} from "react-router";
import UserInput from "./UserInput.jsx";
import Button from "./Button.jsx";
import store, {authActions} from "../store/index.js";
import {validateEmail, validatePassword} from "../utils/formValidationUtils.js";

const LoginForm = ({method}) => {
  const formActionData = useActionData()
  const [emailErrors, setEmailErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

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
    })
  }, [formActionData])

  return (
    <Form method={method}
          className='flex flex-col gap-5 items-center'>
      <UserInput label="email"
                 type='email'
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
        <Button label="Login"
                buttonType={'primary'}
                isOnPrimary={false}
                size={'md'}/>
      </div>
    </Form>
  );
};

export default LoginForm;

export async function formAction({request, params}) {
  const formData = await request.formData();

  const email = formData.get('email')
  const password = formData.get('password')

  let error = []

  error.push(...validateEmail(email))
  error.push(...validatePassword(password))

  if (error.length > 0) {
    return {
      success: false,
      error
    }
  }

  store.dispatch(authActions.login({role: 'user'}))
  return {success: true}
}

