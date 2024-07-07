import { useEffect, useState } from 'react';
import logo from '../../../public/noteTubeLogo.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full flex justify-center items-center bg-transparent text-white fixed top-0 left-0 z-50 shadow-lg transition-all duration-300 ease-in-out transform ${isScrolled ? 'translate-y-4' : 'translate-y-0'}`}
    >
      <div
        className={`w-full max-w-screen-lg bg-transparent rounded-full flex flex-col lg:flex-row items-center justify-between py-4 lg:py-6 px-4 lg:px-8 ${isScrolled ? 'border-2 border-gray-900 backdrop-blur-lg bg-opacity-15' : ''}`}
      >
        <div className="flex items-center">
          <a href="/">
            <img src={logo} alt="NoteTube Logo" className="w-16 lg:w-20 mr-2" />
          </a>
        </div>
        <nav className="flex lg:flex space-x-6 lg:ml-auto mt-4 lg:mt-0">
          <a
            href="/"
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            Try
          </a>
          <a
            href="#why"
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            Why?
          </a>
          <a
            href="#how"
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            How?
          </a>
        </nav>
      </div>
    </header>
  );
}
