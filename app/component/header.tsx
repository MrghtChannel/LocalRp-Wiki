'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const preventScroll = (e: WheelEvent) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'; 
      window.addEventListener('wheel', preventScroll, { passive: false } as EventListenerOptions);
    } else {
      document.body.style.overflow = 'auto'; 
      window.removeEventListener('wheel', preventScroll);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', preventScroll);
    };
  }, [isMenuOpen]);

  const handleCategoryClick = (link: string | undefined) => {
    if (link) {
      router.push(link);
    } else {
      console.error('Link is undefined!');
    }
  };

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
              <a href="/" className="text-2xl font-semibold text-white hover:text-blue-500">
                Головна
              </a>
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

      <header className="w-full flex justify-center items-center px-[4cm] py-4 bg-transparent sm:flex-row flex-col">
        <div className="flex items-center">
          <Link href="/" passHref>
            <img src="/logo.png" alt="LocalRP Logo" className="h-16 cursor-pointer" />
          </Link>
          <span className="bg-blue-600 text-white px-4 py-2 rounded-md text-lg align-middle font-semibold">
            WIKI
          </span>
        </div>
        <div className="w-full sm:w-[40%] h-[50px] flex items-center bg-[#12141d] rounded-md shadow-md px-4 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 mx-auto mt-4 sm:mt-0">
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
            className="ml-3 flex-grow bg-transparent text-lg text-gray-300 placeholder-gray-500 focus:outline-none"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
