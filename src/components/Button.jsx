import React from 'react';

const Button = ({label,onClick}) => {
  return (
    <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold p-3 rounded-lg w-full">
      {label}
    </button>
  );
};

export default Button;