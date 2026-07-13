import React from 'react';

const UserInput = ({label, placeholder, ...props}) => {
  return (
    <div className='flex flex-col gap-2 w-full text-left'>
      <label className="text-md font-medium capitalize text-gray-700" htmlFor={label}>
        {label}
      </label>

      <input
        {...props} id={label} placeholder={placeholder} className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"/>
    </div>
  );
};

export default UserInput;