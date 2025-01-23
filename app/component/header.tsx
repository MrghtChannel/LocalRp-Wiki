'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const preventScroll = (e: WheelEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', preventScroll, { passive: false });
    } else {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', preventScroll);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', preventScroll);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative text-white">
      <div className="absolute top-4 right-4 z-50">
        <button
          className="text-white text-4xl"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0c0e14] bg-opacity-90 flex items-center justify-center z-40">
          <div className="text-center space-y-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" passHref>
                <span className="text-2xl font-semibold text-white hover:text-blue-500">
                  Головна
                </span>
              </Link>
              <a href="http://localrp.com.ua/donate" className="text-2xl font-semibold text-white hover:text-blue-500">
                Донат
              </a>
              <a href="http://forum.localrp.com.ua" className="text-2xl font-semibold text-white hover:text-blue-500">
                Форум
              </a>
              <a href="http://wiki.localrp.com.ua" className="text-2xl font-semibold text-white hover:text-blue-500">
                Вікі
              </a>
            </div>
          </div>
        </div>
      )}

      <header className="w-full flex flex-col sm:flex-row justify-between items-center px-4 py-4 bg-transparent">
        <div className="flex items-center mb-4 sm:mb-0">
          <Link href="/" passHref>
            <Image
              src="/logo.png"
              alt="LocalRP Logo"
              width={128}
              height={128}
              className="h-12 sm:h-16 cursor-pointer"
            />
          </Link>
          <span className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-lg font-semibold ml-2">
            WIKI
          </span>
        </div>

        <div className="w-full sm:w-[30%] md:w-[40%] h-12 sm:h-[50px] flex items-center justify-center bg-[#12141d] rounded-md shadow-md px-4 focus-within:ring-2 focus-within:ring-blue-500 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            type="text"
            placeholder="Пошук інформації на сайті..."
            className="ml-3 flex-grow bg-transparent text-sm sm:text-lg text-gray-300 placeholder-gray-500 focus:outline-none"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
