import React from 'react';

const HomePage = () => {
  const todo = [
    "Establish react router (main layout, two col layout) between pages",
    "Create login/signup form",
    "Create dashboard tables",
    "Design popup dialog",
    "Establish layout for each page (Guest UserDashboard, User UserDashboard, Admin UserDashboard)"
  ]

  return (
    <>
      {todo.map((item, index) => <li key={index}>{item}</li>)}
    </>
  );
};

export default HomePage;