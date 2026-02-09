import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import Button from '../ui/Button';

const Header: React.FC = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.cart);
    const auth = useSelector((state: RootState) => state.auth);
    const { cartItems } = cart;
    const { userInfo } = auth;

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-[#FAFAF7]/80 backdrop-blur-md border-b border-gray-200">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-heading font-bold text-[#1E6F5C]">
                        Shud<span className="text-[#7A4A2E]">dham</span>
                    </span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="/" className="text-gray-700 hover:text-[#1E6F5C] font-medium transition-colors">Home</a>
                    <a href="/spices" className="text-gray-700 hover:text-[#1E6F5C] font-medium transition-colors">Spices</a>
                    <a href="/oils" className="text-gray-700 hover:text-[#1E6F5C] font-medium transition-colors">Pure Oils</a>
                    <a href="/about" className="text-gray-700 hover:text-[#1E6F5C] font-medium transition-colors">About Us</a>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Search Button */}
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
                    >
                        <Search className="h-5 w-5" />
                    </button>

                    {/* Cart Button */}
                    <button
                        onClick={() => navigate('/cart')}
                        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        {cartItemCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-[#F2B705] text-[10px] font-bold text-[#7A4A2E] flex items-center justify-center rounded-full">
                                {cartItemCount}
                            </span>
                        )}
                    </button>

                    {/* User / Login */}
                    <div className="hidden md:block">
                        {userInfo ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <User className="h-5 w-5 text-gray-700" />
                                    <span className="hidden lg:block text-sm font-medium text-gray-700">{userInfo.name}</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <Button
                                variant="primary"
                                size="sm"
                                className="hidden lg:flex"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Search Bar Dropdown */}
            {searchOpen && (
                <div className="border-t border-gray-200 bg-white/95 backdrop-blur-sm">
                    <div className="container mx-auto px-4 py-4">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for spices, oils..."
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                                autoFocus
                            />
                            <Button type="submit">Search</Button>
                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <a href="/" className="text-gray-700 hover:text-[#1E6F5C] font-medium">Home</a>
                        <a href="/spices" className="text-gray-700 hover:text-[#1E6F5C] font-medium">Spices</a>
                        <a href="/oils" className="text-gray-700 hover:text-[#1E6F5C] font-medium">Pure Oils</a>
                        <a href="/about" className="text-gray-700 hover:text-[#1E6F5C] font-medium">About Us</a>
                        <div className="border-t border-gray-200 pt-4">
                            {userInfo ? (
                                <>
                                    <a href="/profile" className="block text-gray-700 hover:text-[#1E6F5C] font-medium mb-2">My Profile</a>
                                    <button onClick={handleLogout} className="text-gray-700 hover:text-[#1E6F5C] font-medium">Logout</button>
                                </>
                            ) : (
                                <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>Login</Button>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
