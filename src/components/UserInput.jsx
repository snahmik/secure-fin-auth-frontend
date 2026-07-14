import React, {useState} from 'react';

const UserInput = ({label, placeholder, errorMessages, ...props}) => {

  const hasError = errorMessages && errorMessages.length > 0

  return (
    <div className='flex flex-col gap-2 w-full text-left'>
      <label className="text-md font-medium capitalize text-black"
             htmlFor={label}>
        {label}
      </label>
      <input
        {...props} id={label}
        placeholder={'Eg. ' + placeholder}
        className={`${hasError ? 'border-red-400' : 'border-gray-300'} w-full rounded-lg border  p-3 text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}/>
      {hasError && <ul className="list-disc list-inside m-0">
        {errorMessages.map((error, index) => <li key={index} className="text-red-500 text-sm ">{error}</li>)}
      </ul>}
    </div>
  );
};

export default UserInput;