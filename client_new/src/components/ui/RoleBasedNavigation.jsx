import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedNavigation = ({ userRole = 'admin', connectionStatus = 'connected' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = {
    admin: [
      { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
      { label: 'Live Tracking', path: '/live-tracking-map', icon: 'MapPin' },
      { label: 'AI Insights', path: '/ai-insights-analytics', icon: 'Brain' },
      { label: 'Blockchain', path: '/blockchain-verification-center', icon: 'Link' },
      { label: 'Wallet', path: '/digital-wallet-dashboard', icon: 'Wallet' },
    ],
    manager: [
      { label: 'Dashboard', path: '/manager-dashboard', icon: 'LayoutDashboard' },
      { label: 'Live Tracking', path: '/live-tracking-map', icon: 'MapPin' },
      { label: 'AI Insights', path: '/ai-insights-analytics', icon: 'Brain' },
      { label: 'Blockchain', path: '/blockchain-verification-center', icon: 'Link' },
      { label: 'Wallet', path: '/digital-wallet-dashboard', icon: 'Wallet' },
    ],
    driver: [
      { label: 'Deliveries', path: '/driver-pwa-app', icon: 'Package' },
      { label: 'Live Tracking', path: '/live-tracking-map', icon: 'MapPin' },
    ],
  };

  const currentNavItems = navigationItems?.[userRole] || navigationItems?.admin;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-content">
          <div
            className="navbar-logo cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="navbar-logo-icon">
              <img src="/logo.png" alt="NexLogica Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="navbar-logo-text">NexLogica</span>
          </div>

          <div className="navbar-menu">
            {currentNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`navbar-menu-item ${isActive(item?.path) ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={18} className="inline-block mr-2" />
                {item?.label}
              </button>
            ))}
          </div>

          <div className="navbar-actions">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`navbar-status-indicator ${connectionStatus}`} />
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'syncing' ? 'Syncing...' : 'Disconnected'}
                </span>
              </div>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}
                className="navbar-menu-item text-red-500 hover:bg-red-500/10"
              >
                <Icon name="LogOut" size={18} className="inline-block mr-2" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="mobile-menu-button"
        aria-label="Toggle mobile menu"
      >
        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
      </button>
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? '' : 'closed'}`}>
        <div className="mobile-menu-content">
          {currentNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`mobile-menu-item ${isActive(item?.path) ? 'active' : ''}`}
            >
              <Icon name={item?.icon} size={20} className="inline-block mr-3" />
              {item?.label}
            </button>
          ))}
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
            className="mobile-menu-item text-red-500 w-full text-left"
          >
            <Icon name="LogOut" size={20} className="inline-block mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default RoleBasedNavigation;