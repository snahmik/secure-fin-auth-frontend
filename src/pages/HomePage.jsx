import React from 'react';

const HomePage = () => {
  const todo = [
    'API integration for login/signup/deposit/make transfer/approve transfer/reject transfer',
    'Redux store for user specific transactions and balance?',
    'Redux store for all user transaction and approve/reject operation',
    'Design dialog for deposit and transfer',
    'Hero Section',
    'Highlighting for active page',
    'Admin Dashboard'
  ]

  return (
    <>
      {todo.map((item, index) => <li key={index}>{item}</li>)}
    </>
  );
};

export default HomePage;