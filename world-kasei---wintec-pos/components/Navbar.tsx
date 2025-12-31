import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we are on the home page for transparency logic
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'ホーム', path: '/' },
    { name: '製品情報', path: '/products' },
    { name: 'ソリューション', path: '/solutions' },
    { name: 'テクノロジー', path: '/technology' },
    { name: 'サポート', path: '/support' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out font-sans ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <Link to="/" className="flex items-center gap-3">
              <div className={`w-10 h-10 flex items-center justify-center font-bold rounded transition-colors duration-300 ${
                scrolled ? 'bg-[#003366] text-white' : (isHome ? 'bg-white text-[#003366]' : 'bg-[#003366] text-white')
              }`}>
                WK
              </div>
              <div className={`flex flex-col transition-colors duration-300 ${
                scrolled ? 'text-[#003366]' : (isHome ? 'text-white' : 'text-[#003366]')
              }`}>
                <span className="font-bold text-lg leading-none tracking-tight">World Kasei</span>
                <span className="text-[10px] tracking-widest uppercase opacity-80 mt-1">WINTEC Authorized</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-[#007BFF] relative group ${
                  scrolled || !isHome ? 'text-slate-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled || !isHome ? 'bg-[#007BFF]' : 'bg-white'
                }`}></span>
              </Link>
            ))}
            <Link 
              to="/support"
              className={`group flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                scrolled 
                  ? 'bg-[#007BFF] text-white hover:bg-[#0069d9]' 
                  : 'bg-white text-[#003366] hover:bg-gray-100'
              }`}
            >
              <Phone size={16} className={scrolled ? 'text-white' : 'text-[#003366]'} />
              <span>お問い合わせ</span>
              <ChevronRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                scrolled || !isHome ? 'text-[#003366]' : 'text-white'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#003366]/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ top: '0' }}>
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
           <button 
             onClick={() => setIsOpen(false)}
             className="absolute top-6 right-6 text-white/70 hover:text-white"
           >
             <X size={32} />
           </button>
           
           <div className="space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-2xl font-bold text-white hover:text-[#007BFF] transition-colors"
              >
                {link.name}
              </Link>
            ))}
           </div>
           
           <div className="mt-auto">
             <Link
               to="/support"
               onClick={() => setIsOpen(false)}
               className="flex items-center justify-center w-full bg-[#F5A623] text-white px-6 py-4 rounded-lg font-bold text-lg shadow-lg"
             >
               お問い合わせ
             </Link>
             <p className="mt-8 text-white/40 text-xs text-center">
               &copy; World Kasei Co., Ltd.
             </p>
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;