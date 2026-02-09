import React from 'react';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-[#FAFAF7]/80 backdrop-blur-md border-b border-gray-200">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-heading font-bold text-[#1E6F5C]">
                        Shud<span className="text-[#7A4A2E]">dham</span>
                    </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="/" className="text-gray-700 hover:text-[#1E6F5C] font-medium transition-colors">Home</a>
                    <a href="/spices" className="text-gray-700 hover:text-[#1E6F5C] font-medium transition-colors">Spices</a>
                    <a href="/oils" className="text-gray-700 hover:text-[#1E6F5C] font-medium transition-colors">Pure Oils</a>
                    <a href="/about" className="text-gray-700 hover:text-[#1E6F5C] font-medium transition-colors">About Us</a>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                        <Search className="h-5 w-5" />
                    </button>

                    <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-[#F2B705] text-[10px] font-bold text-[#7A4A2E] flex items-center justify-center rounded-full">
                            2
                        </span>
                    </button>

                    <div className="hidden md:block">
                        <Button variant="primary" size="sm" className="hidden lg:flex">
                            Login
                        </Button>
                        <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                            <User className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2 text-gray-700">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
