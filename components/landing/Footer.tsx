'use client';

import Link from 'next/link';
import { Play, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

const footerLinks = {
  Produit: [
    { label: 'Catalogue', href: '#catalog' },
    { label: 'Événements', href: '#events' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Application', href: '#app' },
    { label: 'Nouveautés', href: '#' },
  ],
  Entreprise: [
    { label: 'À propos', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Carrières', href: '#' },
    { label: 'Presse', href: '#' },
    { label: 'Partenaires', href: '#' },
  ],
  Support: [
    { label: 'Aide', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Communauté', href: '#' },
  ],
  Légal: [
    { label: 'CGU', href: '#' },
    { label: 'Confidentialité', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Mentions légales', href: '#' },
  ],
};

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top: Logo + newsletter */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-12 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center">
                <Play size={16} className="text-black fill-black ml-0.5" />
              </div>
              <span className="text-lg font-bold tracking-widest text-white">WAWAW</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              La plateforme de streaming dédiée au cinéma africain et à la culture de la diaspora.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon size={16} className="text-white/50 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-sm w-full">
            <p className="text-sm font-semibold text-white mb-1">Restez informé</p>
            <p className="text-xs text-white/40 mb-4">Nouveaux contenus, événements et offres exclusives.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]/40 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#FFD700] text-black text-sm font-bold rounded-xl hover:bg-[#E2B93B] transition-colors shrink-0"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">{category}</p>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} WAWAW. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-white/30">Tous les systèmes opérationnels</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
