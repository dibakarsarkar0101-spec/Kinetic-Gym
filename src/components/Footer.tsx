import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 shadow-md">
                <Dumbbell className="w-4 h-4 stroke-[2.5]" />
              </span>
              <span className="font-heading font-black text-xl uppercase tracking-wider text-white">
                KINETIC<span className="text-amber-400">.</span>
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mb-6">
              A modern gym management and athletic training facility. Precision equipment, certified coaches, and frictionless digital membership access.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <a href="#" className="hover:text-amber-400 transition-colors">Instagram</a>
              <span className="text-neutral-700">·</span>
              <a href="#" className="hover:text-amber-400 transition-colors">YouTube</a>
              <span className="text-neutral-700">·</span>
              <a href="#" className="hover:text-amber-400 transition-colors">Strava Club</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4 font-mono">
              Portal Sections
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home & Overview</a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">Membership Plans</a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-white transition-colors">Workout Tracks</a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-white transition-colors">Dashboard Demo</a>
              </li>
              <li>
                <a href="#coaches" className="hover:text-white transition-colors">Coach Directory</a>
              </li>
              <li>
                <a href="#facility" className="hover:text-white transition-colors">Facility Features</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4 font-mono">
              Operating Hours
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-neutral-300 font-semibold">Monday – Saturday</p>
                <p className="text-neutral-400 font-mono">05:00 AM – 11:00 PM</p>
              </div>
              <div>
                <p className="text-neutral-300 font-semibold">Sunday</p>
                <p className="text-neutral-400 font-mono">07:00 AM – 08:00 PM</p>
              </div>
              <div className="pt-2 text-[11px] text-amber-400 font-mono">
                24/7 keyless entry for Elite members
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4 font-mono">
              Club Location
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Level 2, Apex Pavilion, 4th Cross Road, Indiranagar</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@kineticclub.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© 2026 Kinetic Athletic Club. All rights reserved. Day 2 Frontend Prototype.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Membership</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Gym Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
