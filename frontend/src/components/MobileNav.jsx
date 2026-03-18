import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, Dumbbell } from 'lucide-react';

const MobileNav = () => {
    return (
        <nav className="mobile-nav">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Home size={24} />
                <span>Dashboard</span>
            </NavLink>
            
            <NavLink to="/log" className={({ isActive }) => `nav-item add-btn flex items-center justify-center ${isActive ? 'active' : ''}`}>
                <div className="add-btn-inner">
                    <PlusCircle size={32} />
                </div>
            </NavLink>
            
            <NavLink to="/exercises" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Dumbbell size={24} />
                <span>Exercises</span>
            </NavLink>
        </nav>
    );
};

export default MobileNav;
