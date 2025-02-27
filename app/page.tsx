"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "./component/footer";
import { Menu } from "../config-menu";

export default function Home() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleCategoryClick = (link: string | undefined) => {
    if (link) {
      router.push(link);
    } else {
      console.error('Link is undefined!');
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-[#0c0e14] relative text-white">
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
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white">
            </button>
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-2xl font-semibold text-white hover:text-blue-500">
                Головна
              </Link>
              <a href="http://localrp.com.ua/donate" className="text-2xl font-semibold text-white hover:text-blue-500">
                Донат
              </a>
              <a href="http://forum.localrp.com.ua/forum" className="text-2xl font-semibold text-white hover:text-blue-500">
                Форум
              </a>
              <a href="http://wiki.localrp.com.ua" className="text-2xl font-semibold text-white hover:text-blue-500">
                Вікі
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <div className="text-center mt-52">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase">
          <Image 
            src="/logo.png" 
            alt="LocalRP Logo" 
            className="inline-block h-auto max-h-32 w-32 rounded-full" 
            width={250} 
            height={250} 
            loading="lazy" 
          />
          </h1>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Платформа, де ви знайдете всю детальну інформацію про найнеобхідніше в нашій грі.
          </p>
        </div>

        <div className="mt-8 mb-14 w-full sm:w-[80%] md:w-[60%] lg:w-[30%] h-[50px] flex items-center bg-[#12141d] rounded-md shadow-md px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
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
        <div className="w-full max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-300 mb-6">Список категорій:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Menu.map((category, index) => (
              <div
                key={index}
                className="bg-[#12141d] p-6 rounded-md shadow-md hover:bg-[#1a1c24] transition-colors cursor-pointer flex items-center justify-between"
                onClick={() => handleCategoryClick(category.link)}
              >
                <div className="flex items-center">
                  <div className="mr-4 text-3xl">
                    {category.icon === 'map' && <span>🗺</span>}
                    {category.icon === 'car' && <span>🚗</span>}
                    {category.icon === 'home' && <span>🏡</span>}
                    {category.icon === 'business' && <span>💰</span>}
                    {category.icon === 'box' && <span>📦</span>}
                    {category.icon === 'book' && <span>📚</span>}
                    {category.icon === 'briefcase' && <span>💼</span>}
                    {category.icon === 'government' && <span>🏛</span>}
                    {category.icon === 'crime' && <span>👹</span>}
                    {category.icon === 'family' && <span>👪</span>}
                    {category.icon === 'pass' && <span>🏆</span>}
                    {category.icon === 'play' && <span>▶</span>}
                    {category.icon === 'error' && <span>⚠</span>}
                    {category.icon === 'roleplay' && <span>👩‍👨‍👦</span>}
                    {category.icon === 'software' && <span>🖥</span>}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                    <p className="text-sm text-gray-400">{category.description}</p>
                  </div>
                </div>
                <div className="ml-4 text-xl text-blue-500 hover:text-blue-300">
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_4568_566)">
                      <path d="M10.5 6V8H5.5V19H16.5V14H18.5V20C18.5 20.2652 18.3946 20.5196 18.2071 20.7071C18.0196 20.8946 17.7652 21 17.5 21H4.5C4.23478 21 3.98043 20.8946 3.79289 20.7071C3.60536 20.5196 3.5 20.2652 3.5 20V7C3.5 6.73478 3.60536 6.48043 3.79289 6.29289C3.98043 6.10536 4.23478 6 4.5 6H10.5ZM21.5 3V11H19.5V6.413L11.707 14.207L10.293 12.793L18.085 5H13.5V3H21.5Z" fill="white" fillOpacity="0.4"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_4568_566">
                        <rect width="24" height="24" fill="white" transform="translate(0.5)"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      <Footer />
      </div>
    </div>
  );
}
