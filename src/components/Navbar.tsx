import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, ShieldCheck, ChevronRight, User, Users, Shield } from 'lucide-react';
import { RoleType } from '../types/gym';

interface NavbarProps {
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  onNavigateToRegister: (planId?: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  onNavigateToRegister,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Plans', href: '#plans' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Coaches', href: '#coaches' },
    { label: 'Facility', href: '#facility' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 shadow-lg shadow-black/40 py-3'
            : 'bg-neutral-950/60 backdrop-blur-sm border-b border-neutral-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2 group text-xl sm:text-2xl font-black tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
          >
            <span className="w-8 h-8 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 shadow-md shadow-amber-500/20">
              <Dumbbell className="w-4 h-4 stroke-[2.5]" />
            </span>
            <span className="font-heading uppercase tracking-wider">
              KINETIC<span className="text-amber-400">.</span>
            </span>
          </a>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`relative py-1 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-amber-400 ${
                    isActive ? 'text-amber-400 font-semibold' : 'text-neutral-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Role switcher preview for Day 2 prototype */}
            <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => onRoleChange('member')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all whitespace-nowrap ${
                  currentRole === 'member'
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Preview Member Portal"
              >
                <User className="w-3.5 h-3.5" />
                <span>Member</span>
              </button>
              <button
                type="button"
                onClick={() => onRoleChange('trainer')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all whitespace-nowrap ${
                  currentRole === 'trainer'
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Preview Trainer Portal"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Trainer</span>
              </button>
              <button
                type="button"
                onClick={() => onRoleChange('admin')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all whitespace-nowrap ${
                  currentRole === 'admin'
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Preview Admin Portal"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigateToRegister()}
              className="px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all duration-150 shadow-md shadow-amber-400/20 active:scale-95 whitespace-nowrap"
            >
              Join Now
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-16 right-0 left-0 max-h-[85vh] bg-neutral-950 border-b border-neutral-800 shadow-2xl p-6 overflow-y-auto">
            {/* Role switcher for mobile */}
            <div className="mb-6 pb-4 border-b border-neutral-800">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                Simulate Portal Role
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('member');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold ${
                    currentRole === 'member'
                      ? 'bg-amber-400 border-amber-400 text-neutral-950'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  }`}
                >
                  <User className="w-4 h-4 mb-1" />
                  <span>Member</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('trainer');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold ${
                    currentRole === 'trainer'
                      ? 'bg-amber-400 border-amber-400 text-neutral-950'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  }`}
                >
                  <Users className="w-4 h-4 mb-1" />
                  <span>Trainer</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold ${
                    currentRole === 'admin'
                      ? 'bg-amber-400 border-amber-400 text-neutral-950'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  }`}
                >
                  <Shield className="w-4 h-4 mb-1" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            {/* Nav list */}
            <div className="flex flex-col gap-2 mb-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between w-full py-3 px-3 rounded-lg text-left text-base font-medium text-neutral-200 hover:bg-neutral-900 hover:text-amber-400 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </button>
              ))}
            </div>

            {/* Quick mobile CTA */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToRegister();
                }}
                className="w-full py-3 rounded-lg bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider text-sm shadow-lg shadow-amber-400/20 active:scale-98 text-center"
              >
                Join Now · Get Instant Pass
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Zero signup fees · 7-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
