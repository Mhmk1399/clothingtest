"use client";
import { useState } from "react";
import Link from "next/link";
import { Vazirmatn } from 'next/font/google';

const vazirmatnFont = Vazirmatn({ subsets: ['latin'], display: 'swap' });

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Navigation links, hidden on small screens */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <Link className="text-black hover:text-gray-700 transition" href="/">خانه</Link>
          <Link className="text-black hover:text-gray-700 transition" href="/Store">فروشگاه</Link>
          <Link className="text-black hover:text-gray-700 transition" href="/vipcustomer">باشگاه مشتریان</Link>
          <Link className="text-black hover:text-gray-700 transition" href="/vipcustomer">پیگیری سفارشات</Link>
        </nav>

        {/* Logo on the right */}
        <div className={`text-2xl font-semibold text-black ${vazirmatnFont.className} md:order-2`}>
          <h2>محل لوگو</h2>
        </div>

        {/* Hamburger button, only visible on small screens */}
        <button className="md:hidden text-3xl text-black focus:outline-none" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Dropdown menu for small screens */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-300">
          <nav className="flex flex-col items-center space-y-4 py-4 text-end">
            <Link className="block text-black hover:text-gray-700 transition text-end" href="/">خانه</Link>
            <Link className="block text-black hover:text-gray-700 transition" href="/Store">فروشگاه</Link>
            <Link className="block text-black hover:text-gray-700 transition" href="/vipcustomer">باشگاه مشتریان</Link>
            <Link className="block text-black hover:text-gray-700 transition" href="/vipcustomer">پیگیری سفارشات</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
