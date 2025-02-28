'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="relative text-white">
      <div className="absolute top-4 right-4 z-50">
        <button className="text-white text-4xl" onClick={() => setMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0c0e14] bg-opacity-90 flex items-center justify-center z-40">
          <div className="text-center space-y-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" passHref>
                <span className="text-2xl font-semibold text-white hover:text-blue-500">Головна</span>
              </Link>
              <a href="http://localrp.com.ua/donate" className="text-2xl font-semibold text-white hover:text-blue-500">Донат</a>
              <a href="http://forum.localrp.com.ua" className="text-2xl font-semibold text-white hover:text-blue-500">Форум</a>
              <a href="http://wiki.localrp.com.ua" className="text-2xl font-semibold text-white hover:text-blue-500">Вікі</a>
            </div>
          </div>
        </div>
      )}

      <header className="w-full flex flex-col sm:flex-row justify-between items-center px-4 py-4 bg-transparent">
        <div className="flex items-center mb-4 sm:mb-0">
          <Link href="/" passHref>
            <Image src="/logo.png" alt="LocalRP Logo" className="inline-block h-auto max-h-20 w-20 rounded-full" width={100} height={100} loading="lazy" />
          </Link>
        </div>

        <div className="relative flex-1 flex justify-center">
          <div className="relative w-full sm:w-[50%] md:w-[40%] flex items-center bg-[#12141d] rounded-md shadow-md px-4 h-12 sm:h-[50px] focus-within:ring-2 focus-within:ring-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="text"
              placeholder="Пошук інформації на сайті..."
              className="ml-3 flex-grow bg-transparent text-sm sm:text-lg text-gray-300 placeholder-gray-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {isSearching && <span className="text-gray-500 text-sm ml-2">Завантаження...</span>}
          </div>
          {searchResults.length > 0 && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full sm:w-[50%] md:w-[40%] bg-[#12141d] text-white mt-1 p-4 rounded-md shadow-lg max-h-60 overflow-y-auto">
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index} className="p-3 border-b border-gray-700 last:border-none hover:bg-gray-800 text-lg">
                    <Link href={result} className="text-white">{result}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
