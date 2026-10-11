import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle } from 'lucide-react';

interface FooterProps {
  onOpenDemo: () => void;
  customLogo?: string | null;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo, customLogo, onOpenAdmin }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="text-2xl font-bold tracking-tight text-white font-display mb-3 flex items-center gap-2">
              {customLogo ? (
                <div className="flex items-center gap-3">
                  <img
                    src={customLogo}
                    alt="Brand Logo"
                    className="h-12 max-w-[220px] object-contain rounded bg-white/5 p-1"
                  />
                  <span>Xylenis</span>
                </div>
              ) : (
                <>
                  <span className="w-8 h-8 rounded-lg bg-white text-stone-950 flex items-center justify-center text-sm font-semibold tracking-normal">
                    X
                  </span>
                  <span>Xylenis</span>
                </>
              )}
            </div>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed mb-6">
              The AI order and client operating system engineered exclusively for luxury salons, day spas, and aesthetic medicine clinics.
            </p>
            
            {/* Legitimacy and Official Support details */}
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-500" />
                <span>Support: </span>
                <a 
                  href="mailto:support@xylenis.com" 
                  className="text-stone-200 font-medium hover:text-white underline underline-offset-2 decoration-stone-600"
                >
                  support@xylenis.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>San Francisco · London · Zurich</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SOC2 Type II Certified · HIPAA & GDPR Ready</span>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 sm:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              Platform
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#interactive-os" className="text-stone-300 hover:text-white transition-colors">
                  Front-Desk POS
                </a>
              </li>
              <li>
                <a href="#interactive-os" className="text-stone-300 hover:text-white transition-colors">
                  AI WhatsApp Concierge
                </a>
              </li>
              <li>
                <a href="#interactive-os" className="text-stone-300 hover:text-white transition-colors">
                  Backbar Dispensary Sync
                </a>
              </li>
              <li>
                <a href="#capabilities" className="text-stone-300 hover:text-white transition-colors">
                  Therapist Commission Ledger
                </a>
              </li>
              <li>
                <a href="#revenue-impact" className="text-stone-300 hover:text-white transition-colors">
                  ROI Simulator
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 sm:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              Industry Verticals
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-stone-300">Haute Coiffure Ateliers</span>
              </li>
              <li>
                <span className="text-stone-300">Aesthetic Medical Spas</span>
              </li>
              <li>
                <span className="text-stone-300">Thermal Day Spas & Baths</span>
              </li>
              <li>
                <span className="text-stone-300">Luxury Hotel Retreats</span>
              </li>
              <li>
                <span className="text-stone-300">Multi-Location Groups</span>
              </li>
            </ul>
          </div>

          {/* Contact / Action Column */}
          <div className="md:col-span-3 sm:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              VIP Inquiries & Support
            </div>
            <p className="text-xs text-stone-400 mb-4 leading-relaxed">
              For onboarding, white-glove data migration, or hardware setup, contact our client success team at{' '}
              <a href="mailto:support@xylenis.com" className="text-white underline">
                support@xylenis.com
              </a>.
            </p>
            <button
              onClick={onOpenDemo}
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs rounded-lg transition-colors cursor-pointer text-center"
            >
              Request Walkthrough
            </button>
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Xylenis Systems Inc. All rights reserved. Support:{' '}
            <a href="mailto:support@xylenis.com" className="hover:text-stone-400">
              support@xylenis.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">HIPAA Compliance</span>
            <span className="hover:text-stone-400 cursor-pointer">GDPR Shield</span>
            <span className="hover:text-stone-400 cursor-pointer">Security Whitepaper</span>
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            {onOpenAdmin && (
              <button 
                onClick={onOpenAdmin} 
                className="hover:text-stone-300 transition-colors cursor-pointer text-stone-600 hover:text-stone-400 text-[11px]"
                title="Owner Google Sheets sync configuration"
              >
                Lead Sync (Admin)
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
