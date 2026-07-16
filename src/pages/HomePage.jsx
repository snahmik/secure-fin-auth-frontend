import React from 'react';
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import {Link} from "react-router";

const HomePage = () => {
  return (
    <div className='flex gap-12 w-full h-full items-center'>
      {/* Left Column: Hero Content */}
      <div className='flex-1 flex flex-col gap-8'>
        <div className='flex flex-col gap-6'>
          <h1 className='text-5xl font-extrabold leading-tight text-gray-900'>
            Secure Fin: Your Trusted <span className='text-primary'>Banking Partner</span>
          </h1>
          <p className='text-xl leading-relaxed text-gray-600'>
            Experience a new standard of secure financial management. 
            Manage your accounts, track transactions, and grow your wealth with 
            our state-of-the-art encrypted banking system.
          </p>
        </div>

        <div className='flex gap-4'>
          <div className='w-48'>
            <Link to="/auth/signup">
              <Button label="Get Started" isPrimary={true} isOnPrimary={false} size='lg' />
            </Link>
          </div>
          <div className='w-48'>
            <Link to="/auth/login">
              <Button label="Login" isPrimary={false} isOnPrimary={false} size='lg' />
            </Link>
          </div>
        </div>

        <div className='flex gap-4 mt-4'>
          <Card 
            title="Secure Accounts" 
            caption="Multi-layer encryption to keep your financial data and identity safe." 
          />
          <Card 
            title="Real-time Tracking" 
            caption="Monitor your deposits and transfers instantly with detailed transaction logs." 
          />
        </div>
      </div>

      {/* Right Column: Visual / Placeholder */}
      <div className='flex-1 hidden lg:flex flex-col gap-6 items-center justify-center p-12 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner'>
        <div className='w-full h-64 bg-slate-200 rounded-2xl flex items-center justify-center'>
           <span className='text-slate-400 font-medium italic'>Visual Representation of Secure Fin</span>
        </div>
        <div className='grid grid-cols-2 gap-4 w-full'>
          <div className='h-24 bg-white rounded-xl shadow-sm border border-slate-50 p-4'>
            <div className='w-8 h-8 bg-green-100 rounded-full mb-2'></div>
            <div className='w-full h-2 bg-slate-100 rounded'></div>
          </div>
          <div className='h-24 bg-white rounded-xl shadow-sm border border-slate-50 p-4'>
            <div className='w-8 h-8 bg-blue-100 rounded-full mb-2'></div>
            <div className='w-full h-2 bg-slate-100 rounded'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;