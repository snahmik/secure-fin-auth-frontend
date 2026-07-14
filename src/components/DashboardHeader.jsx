import React from 'react';

const DashboardHeader = ({username}) => {
  return (
    <section className='flex flex-col gap-1'>
      <p className='text-lg text-slate-400'>Friday, July 11, 2026</p>
      <h1 className='text-3xl font-bold'>{'Welcome back,' + username}</h1>
    </section>
  );
};

export default DashboardHeader;