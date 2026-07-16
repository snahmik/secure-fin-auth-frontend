import React from 'react';
import {getCurrentDayAndDate} from "../utils/formatterUtils.js";

const DashboardHeader = ({username}) => {
  return (
    <section className='flex flex-col gap-1'>
      <p className='text-lg text-slate-400'>{getCurrentDayAndDate()}</p>
      <h1 className='text-3xl font-bold'>{'Welcome back, ' + username}</h1>
    </section>
  );
};

export default DashboardHeader;