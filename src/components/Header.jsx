import { Cloud, Search, Bell, Moon, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = ({ onSearch, activeTab, setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setIsSearchVisible(false); // Hide search on mobile after search
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Cloud className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          <span className="text-lg sm:text-xl font-bold text-white">WeatherScope</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`text-sm font-medium transition-colors ${
              activeTab === 'dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('maps')}
            className={`text-sm font-medium transition-colors ${
              activeTab === 'maps' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Maps
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`text-sm font-medium transition-colors ${
              activeTab === 'alerts' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Alerts
          </button>
        </nav>

        {/* Desktop Search and Actions */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a city..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 lg:w-64"
            />
          </form>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Login
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <Moon className="w-5 h-5" />
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-pink-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleSearch}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={toggleMobileMenu}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchVisible && (
        <div className="md:hidden mt-4 pb-2">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a city..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
          <nav className="flex flex-col gap-4 mb-4">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-medium transition-colors ${
                activeTab === 'dashboard' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('maps');
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-medium transition-colors ${
                activeTab === 'maps' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Maps
            </button>
            <button
              onClick={() => {
                setActiveTab('alerts');
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-medium transition-colors ${
                activeTab === 'alerts' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Alerts
            </button>
          </nav>
          
          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Login
            </button>
            
            <button className="text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <button className="text-gray-400 hover:text-white transition-colors">
              <Moon className="w-5 h-5" />
            </button>
            
            <button className="text-gray-400 hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
