import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Link as RouterLink } from 'react-router-dom';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-10 transition-colors duration-300 ${isScrolled ? 'bg-nav' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="flex-1 flex items-center justify-between sm:items-stretch">
            <div className="ml-auto flex space-x-4">
              <Link
                to="#intro"
                className="text-custom hover:bg-gray-200 hover:text-gray-900 px-3 py-4 rounded-md text-xl font-medium no-underline hover:scale-60 transition-transform duration-300"
              >
                Home
              </Link>
              <Link
                to="#about"
                className="text-custom hover:bg-gray-200 hover:text-gray-900 px-3 py-4 rounded-md text-xl font-medium no-underline hover:scale-60 transition-transform duration-300"
              >
               About
              </Link>
              <Link
                to="#education"
                className="text-custom hover:bg-gray-200 hover:text-gray-900 px-3 py-4 rounded-md text-xl font-medium no-underline hover:scale-60 transition-transform duration-300"
              >
                Education
              </Link>
              <Link
                to="#experiences"
                className="text-custom hover:bg-gray-200 hover:text-gray-900 px-3 py-4 rounded-md text-xl font-medium no-underline hover:scale-60 transition-transform duration-300"
              >
                Experiences
              </Link>
              <Link
                to="#projects"
                className="text-custom hover:bg-gray-200 hover:text-gray-900 px-3 py-4 rounded-md text-xl font-medium no-underline hover:scale-60 transition-transform duration-300"
              >
                Projects
              </Link>
              <Link
                to="#courses"
                className="text-custom hover:bg-gray-200 hover:text-gray-900 px-3 py-4 rounded-md text-xl font-medium no-underline hover:scale-60 transition-transform duration-300"
              >
                Courses
              </Link>
              <Link
                to="#contact"
                className="text-custom hover:bg-gray-200 hover:text-gray-900 px-3 py-4 rounded-md text-xl font-medium no-underline hover:scale-60 transition-transform duration-300"
              >
                Contact
              </Link>
              <RouterLink
                to="/admin-login"
                className="text-custom hover:bg-gray-200 hover:text-gray-900 px-3 py-4 rounded-md text-xl font-medium no-underline hover:scale-60 transition-transform duration-300"
              >
                Login
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
