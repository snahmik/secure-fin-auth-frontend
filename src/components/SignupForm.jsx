import React, {useEffect, useState} from 'react';
import {Form, useActionData} from "react-router";
import UserInput from "./UserInput.jsx";
import Button from "./Button.jsx";
import store, {authActions} from "../store/index.js";
import {validateEmail, validateName, validatePassword} from "../utils/formValidationUtils.js";

const SignupForm = ({method}) => {
  const formActionData = useActionData()
  const [nameErrors, setNameErrors] = useState([])
  const [emailErrors, setEmailErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

  useEffect(() => {
    setEmailErrors([])
    setPasswordErrors([])

    if (!formActionData?.error) {
      return
    }

    formActionData.error.forEach((error) => {
      switch (error.type) {
        case 'name':
          setNameErrors((prevState) => [...prevState, error.message])
          break
        case 'email':
          setEmailErrors((prevState) => [...prevState, error.message])
          break
        case 'password':
          setPasswordErrors((prevState) => [...prevState, error.message])
          break
      }
    })
  }, [formActionData]);

  return (
    <Form method={method} className='flex flex-col gap-5 items-center'>
      <UserInput label="name"
                 type='text'
                 name='name'
                 placeholder='Enter your name'
                 errorMessages={nameErrors}
                 onChange={() => {
                   setNameErrors([])
                 }}
                 />
      <UserInput label="email"
                 type='email'
                 name='email'
                 placeholder='Enter your email'
                 errorMessages={emailErrors}
                 onChange={() => {
                   setEmailErrors([])
                 }}
                 />
      <UserInput label="password"
                 type='password'
                 name='password'
                 placeholder='Enter your password'
                 errorMessages={passwordErrors}
                 onChange={() => {
                   setPasswordErrors([])
                 }}
                 />
      <div className='my-2 w-3/5'>
        <Button label="Sign Up"
                buttonType={'primary'}
                isOnPrimary={false}
                size={'md'}/>
      </div>
    </Form>);
};

export default SignupForm;

export async function formAction({request, params}) {
  const formData = await request.formData();

  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  let error = []

  error.push(...validateName(name))
  error.push(...validateEmail(email))
  error.push(...validatePassword(password))

  if (error.length > 0) {
    return {
      success: false, error
    }
  }

  store.dispatch(authActions.login({role: 'user'}))
  return {success: true}
}

