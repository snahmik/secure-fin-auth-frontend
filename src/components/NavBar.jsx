import React from 'react';

const NavBar = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          YourLogo
        </a>

        <div className="flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-gray-900"
          >
            Home
          </a>

          <a
            href="/contact"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>);
};

export default NavBar;