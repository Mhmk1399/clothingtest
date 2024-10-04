"use client"
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center md:text-left px-4">
        {/* Sign Up Button */}
        <div className="mb-8 flex justify-center md:justify-start mx-auto">
          <a className="bg-white text-black py-2 px-6 rounded-full font-semibold transition duration-200 hover:bg-gray-200 cursor-pointer mx-auto" href="/SignUp">
            ثبت نام در لوسی من کلاب
          </a>
        </div>
        
        {/* Footer Links and Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row text-center md:text-left space-y-4 md:space-y-0 md:space-x-8"></div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row text-center md:text-left space-y-4 md:space-y-0 md:space-x-8">
            <Link className="hover:text-gray-400 transition duration-200" href="/">خانه</Link>
            <Link className="hover:text-gray-400 transition duration-200" href="/store">فروشگاه</Link>
            <Link className="hover:text-gray-400 transition duration-200" href="/">لوسی من کلاب</Link>
            <Link className="hover:text-gray-400 transition duration-200" href="/">پیگیری سفارشات</Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-8 md:mt-0">
            <a href="#" className="hover:text-gray-400 transition duration-200">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-200">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-200">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-200">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        {/* Copyright Notice */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} lusyman. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
