import React from 'react';

const StatisticalCard = ({dataLabel,dataValue,description}) => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col gap-4 flex-1'>
      <p className='text-md text-slate-400'>{dataLabel}</p>
      <h3 className='text-2xl font-bold'>{dataValue}</h3>
      <p className='text-lg text-teal-700'>{description}</p>
    </div>
  );
};

export default StatisticalCard;