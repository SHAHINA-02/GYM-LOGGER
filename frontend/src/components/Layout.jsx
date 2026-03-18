import React from 'react';
import MobileNav from './MobileNav';

const Layout = ({ children }) => {
    return (
        <div className="layout wrapper animate-fade-in">
            <header className="header text-center">
                <h2>Gym <span className="text-gold">Logger</span></h2>
            </header>
            <main className="container">
                {children}
            </main>
            <MobileNav />
        </div>
    );
};

export default Layout;
