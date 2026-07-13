import React from 'react';
import Button from "./Button.jsx";
import {Link, NavLink} from "react-router";

const NavBar = () => {
  return (
    <header>
      <nav className="w-full border-b border-gray-200 bg-white px-64 py-4 flex justify-between items-center">
        <Link className="text-2xl font-bold tracking-tight" to="/" >FinSecure</Link>
        <ul className={'flex gap-6'}>
          <li >
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Get Started</NavLink>
          </li>
          <li>
            <NavLink to="/user">User Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin">Admin Dashboard</NavLink>
          </li>
        </ul>
      </nav>
    </header>
    );
};

export default NavBar;