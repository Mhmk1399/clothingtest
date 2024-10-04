import React from 'react';

export const SmallFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { text: 'About', href: '#' },
    { text: 'Privacy Policy', href: '#' },
    { text: 'Licensing', href: '#' },
    { text: 'Contact', href: '#' },
  ];

  const companyInfo = {
    name: 'Flowbite™',
    website: 'https://flowbite.com/',
  };

  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {currentYear}{' '}
          <a href={companyInfo.website} className="hover:underline">
            {companyInfo.name}
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {footerLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className={`hover:underline ${
                  index < footerLinks.length - 1 ? 'me-4 md:me-6' : ''
                }`}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
