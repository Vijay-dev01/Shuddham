import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, Star } from 'lucide-react';

interface AdminSidebarProps {
    isOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen }) => {
    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Products', path: '/admin/products', icon: Package },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
        { name: 'Customers', path: '/admin/customers', icon: Users },
        { name: 'Reviews', path: '/admin/reviews', icon: Star },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-[#1E6F5C] text-white w-64 transition-transform duration-300 z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="p-6">
                <h1 className="text-2xl font-heading font-bold">
                    Shud<span className="text-[#F2B705]">dham</span>
                </h1>
                <p className="text-sm text-green-200 mt-1">Admin Panel</p>
            </div>

            <nav className="mt-6">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-3 transition-colors ${isActive
                                ? 'bg-white/10 border-r-4 border-[#F2B705] text-white'
                                : 'text-green-100 hover:bg-white/5'
                            }`
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
