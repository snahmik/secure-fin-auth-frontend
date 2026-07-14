import React from 'react';
import {Form} from "react-router";
import UserInput from "./UserInput.jsx";
import Button from "./Button.jsx";
import store, {authActions} from "../store/index.js";

const LoginForm = ({method}) => {

  return (
    <Form method={method}
          className='flex flex-col gap-5 items-center'>
      <UserInput label="email"
                 type='email'
                 name='email'
                 placeholder='Enter your email'/>
      <UserInput label="password"
                 type='password'
                 name='password'
                 placeholder='Enter your password'/>
      <div className='my-2 w-3/5'>
        <Button label="Login" buttonType={'primary'} isOnPrimary={false} size={'md'}/>
      </div>
    </Form>
  );
};

export default LoginForm;

export async function formAction({request, params}) {
  const formData = await request.formData();
  console.log(formData);

  console.log("hihi");

  store.dispatch(authActions.login({role: 'user'}))
}

