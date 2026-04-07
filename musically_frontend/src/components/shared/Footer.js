import React from 'react';
import { Icon } from '@iconify/react';

const Footer = () => {
  const footerColumns = [
    {
      heading: 'Company',
      links: ['About', 'Jobs', 'For the Record']
    },
    {
      heading: 'Communities',
      links: ['For Artists', 'Developers', 'Advertising', 'Investors', 'Vendors']
    },
    {
      heading: 'Useful Links',
      links: ['Support', 'Web Player', 'Free Mobile App', 'Contact Melofy']
    },
    {
      heading: 'Plans',
      links: ['Premium Lite', 'Premium Standard', 'Premium Platinum', 'Premium Student']
    }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* 🔥 HEIGHT REDUCED (py-16 → py-10) */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row lg:justify-between">

          {/* 🔥 LOGO FIXED */}
          <div className="max-w-sm space-y-4">
            <div className="flex items-center gap-2 text-white text-2xl font-bold">
              <Icon icon="mdi:music" className="text-primary text-3xl" />
              Melofy
            </div>

            <p className="text-sm text-slate-400">
              Build and share your music journey with Melofy. Upload tracks, create playlists, and discover new audio experiences.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <div className="text-sm font-semibold text-white uppercase tracking-[0.2em] mb-4">
                  {column.heading}
                </div>
                <ul className="space-y-2 text-sm text-slate-400">
                  {column.links.map((link) => (
                    <li key={link} className="hover:text-white transition-colors cursor-pointer">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-sm text-slate-500 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Melofy. All rights reserved.</div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-white cursor-pointer">Legal</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Cookies</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
            <span className="hover:text-white cursor-pointer">India (English)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;