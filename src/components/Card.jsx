import React from 'react';

const Card = ({title,caption}) => {
  return (
      <div className='rounded-xl bg-white p-4 shadow-sm flex-1 flex flex-col gap-2'>
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
        <p className='text-sm text-gray-500'>
          {caption}
        </p>
      </div>
  );
};

export default Card;