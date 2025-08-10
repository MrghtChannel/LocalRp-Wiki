import { useEffect, useState } from "react";

interface AlertProps {
  message: string;
  onClose: () => void;
}

export default function Alert({ message, onClose }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`
          relative
          max-w-md w-full
          rounded-xl
          border border-gray-200 dark:border-[#2a2c36]
          bg-white dark:bg-[#1a1c24]
          shadow-lg
          px-5 py-4
          flex items-center gap-4
          transform transition-all duration-300 ease-out
          ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
      >
        <p className="flex-1 text-sm sm:text-base text-gray-900 dark:text-gray-100">
          {message}
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 
                111.414 1.414L11.414 10l4.293 4.293a1 1 0 
                01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 
                01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 
                010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
