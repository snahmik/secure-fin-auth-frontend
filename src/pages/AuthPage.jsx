import React, {useState} from 'react';
import SignupForm from "../components/SignupForm.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Card from "../components/Card.jsx";
import {Link, NavLink, Outlet, useLocation} from "react-router";

const AuthPage = () => {

  const location = useLocation();
  const isLoginPage = location.pathname === ('/auth/login')

  const title = isLoginPage ? 'Welcome Back' : 'Create Account'
  const subtitle = isLoginPage ? 'Sign in to your FinSecure Account' : 'Create your FinSecure Account today!'

  return (
    <div className='flex gap-8 w-full h-full'>
      {/*Col 1*/}
      <div className='flex-1 flex flex-col justify-between rounded-2xl bg-slate-100 p-10 h-full'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl font-bold leading-tight text-gray-900'>
            Manage your finances with confidence.
          </h1>
          <p className='text-lg leading-8 text-gray-500'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
            Praesent libero. Sed cursus ante dapibus diam. Sed nisi nulla, quis sem
            at nibh elementum imperdiet.
          </p>
          <div className='flex gap-4 mt-2'>
            <Card title="Secure transactions"
                  caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."/>
            <Card title="Safe access"
                  caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."/>
            <Card title="Easy tracking"
                  caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."/>
          </div>
        </div>
        <p>@ Created by Hans Kim Qin Duan</p>
      </div>

      {/*Col 2*/}
      <div className='flex-1 flex flex-col gap-6 items-center'>
        <div className='w-full'>
          <h2 className='text-3xl font-bold'>{title}</h2>
          <p className='text-md text-gray-400'>{subtitle}</p>
        </div>
        <div className='flex w-3/5 bg-slate-100 rounded-md p-1'>
          <NavLink to="/auth/login"
                   className={({isActive}) => `${isActive ? 'bg-white' : ''} flex-1 rounded-sm p-2 text-center`}>Login</NavLink>
          <NavLink to="/auth/signup"
                   className={({isActive}) => `${isActive ? 'bg-white' : ''} flex-1 rounded-sm p-2 text-center`}>Sign
            Up</NavLink>
        </div>
        <div className='w-full flex flex-col gap-6'>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;