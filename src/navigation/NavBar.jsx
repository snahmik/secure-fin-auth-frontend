import React from 'react';
import {Link, NavLink} from "react-router";
import {useSelector} from "react-redux";



const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const userRole = useSelector((state) => state.auth.role)

  const navbarLinks = [{
    label: 'Home',
    dest: '/'
  }]

  if (isAuthenticated) {
    switch (userRole) {
      case 'user':
        navbarLinks.push({
          label: 'User Dashboard',
          dest: '/user'
        })
        break
      case 'admin':
        navbarLinks.push({
          label: 'Admin Dashboard',
          dest: '/admin'
        })
        break;
    }

    navbarLinks.push({
    label: 'Logout',
    dest: '/logout'
    })
  } else {
    navbarLinks.push({
      label: 'Onboarding',
      dest: '/auth'
    })
  }

  return (
    <header className="sticky top-0 z-50">
      <nav className="w-full border-b border-gray-200 bg-white px-64 py-4 flex justify-between items-center">
        <Link className="text-2xl font-bold tracking-tight text-primary"
              to="/">FinSecure</Link>
        <ul className={'flex gap-6'}>
          {navbarLinks.map((navbarLink, index) => {
            const {label, dest} = navbarLink
            return (<NavLinkItem key={label + index}
                                 label={label}
                                 dest={dest}/>)
          })}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

const NavLinkItem = ({label, dest}) => {
  return (
    <li>
      <NavLink to={dest}
               className={({isActive}) => `${isActive ? 'underline text-primary-hover' : 'text-primary'} hover:text-primary-hover'`}>{label}</NavLink>
    </li>
  )
}