import React from 'react';

const HomePage = () => {
  const todo = [
    'API integration for login/signup/deposit/make transfer/approve transfer/reject transfer',
    'Redux store for all user transaction and approve/reject operation',
    'Home Page',
    'Admin Dashboard',
    "==============",
    'Input Validation / Sanitization DONE',
    'Redux store for user specific transactions and balance? DONE',
    'Highlighting for active page DONE',
    'Design dialog for deposit and transfer DONE',
  ]

  return (
    <>
      {todo.map((item, index) => <li key={index}>{item}</li>)}
    </>
  );
};

export default HomePage;