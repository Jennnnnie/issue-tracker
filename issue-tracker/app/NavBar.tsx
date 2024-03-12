'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
// classes we want to render and then conditions that they should be rendered
import classnames from 'classnames';

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {/* mapping links array */}
        {links.map((link) => (
          <Link
            key={link.href}
            // className={`${
            //   link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'
            // } hover:text-black transition-colors no-underline hover:underline`}
            className={classnames(
              'text-zinc-500 hover:text-black transition-colors',
              {
                'text-blue-600 underline': link.href === currentPath,
                'hover:text-blue-600 hover:underline transition-colors': true,
              }
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
