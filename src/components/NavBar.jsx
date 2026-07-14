import React from 'react';
import Button from "./Button.jsx";
import {Link, NavLink} from "react-router";
import {useSelector} from "react-redux";

const navbarLinks = [{
  label: 'Home',
  dest: '/'
}, {
  label: 'Get Started',
  dest: '/auth'
}, {
  label: 'User Dashboard',
  dest: '/user'
}, {
  label: 'Admin Dashboard',
  dest: '/admin'
}]

const NavBar = () => {
  const userRole = useSelector((state) => state.auth.role)

  return (
    <header className="sticky top-0 z-50">
      <nav className="w-full border-b border-gray-200 bg-white px-64 py-4 flex justify-between items-center">
        <Link className="text-2xl font-bold tracking-tight text-primary"
              to="/">FinSecure</Link>
        <ul className={'flex gap-6'}>
          {navbarLinks.map((navbarLink, index) => {
            const {label,dest} = navbarLink
            return (<NavLinkItem key={label+index} label={label} dest={dest}/>)
          })}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

const NavLinkItem = ({label,dest}) => {
  return (
    <li>
      <NavLink to={dest}
               className={({isActive}) => `${isActive? 'underline text-primary-hover' : 'text-primary'} hover:text-primary-hover'`}>{label}</NavLink>
    </li>
  )
}