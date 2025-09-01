"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, renderIcon, MenuItem } from "@/lib/home";

export default function Home() {
  return (
    <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 lg:mt-12 mb-16 sm:mb-20 mx-auto">
      <div className="flex justify-center mb-6 sm:mb-8">
        <Image
          src="/logo.png"
          alt="LocalRP Logo"
          className="inline-block h-auto max-h-28 sm:max-h-32 lg:max-h-36 w-28 sm:w-32 lg:w-36 rounded-full"
          width={250}
          height={250}
          loading="lazy"
        />
      </div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6 sm:mb-8 tracking-tight">
        Платформа з усією важливою інформацією про гру.
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
        {Menu.map((item: MenuItem, idx: number) => (
          <Link
            key={idx}
            href={item.link ?? "#"}
            className="
              relative
              bg-white dark:bg-[#1a1c24]
              p-4 sm:p-5 rounded-xl
              min-h-[120px] sm:min-h-[140px]
              flex items-start gap-4 sm:gap-5
              border border-gray-200 dark:border-[#2a2c36]
              pr-12 sm:pr-14
              group
              no-underline
            "
            aria-label={`Open ${item.title}`}
          >
            <div className="
              w-12 sm:w-14 h-12 sm:h-14 flex-shrink-0 rounded-lg
              bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800
              border border-gray-200 dark:border-[#2a2c36]
              flex items-center justify-center text-2xl sm:text-3xl
              shadow-sm
            ">
              <span aria-hidden>{renderIcon(item.icon)}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 line-clamp-2">
                {item.description}
              </p>
            </div>
            <div
              className="
                absolute right-3 sm:right-4 top-3 sm:top-4
                inline-flex items-center justify-center
                rounded-full p-2 bg-gray-100 dark:bg-[#2a2c36]
                pointer-events-none
              "
              aria-hidden="true"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
              >
                <g clipPath="url(#clip0_4568_566)">
                  <path
                    d="M10.5 6V8H5.5V19H16.5V14H18.5V20C18.5 20.2652 18.3946 20.5196 18.2071 20.7071C18.0196 20.8946 17.7652 21 17.5 21H4.5C4.23478 21 3.98043 20.8946 3.79289 20.7071C3.60536 20.5196 3.5 20.2652 3.5 20V7C3.5 6.73478 3.60536 6.48043 3.79289 6.29289C3.98043 6.10536 4.23478 6 4.5 6H10.5ZM21.5 3V11H19.5V6.413L11.707 14.207L10.293 12.793L18.085 5H13.5V3H21.5Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4568_566">
                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}