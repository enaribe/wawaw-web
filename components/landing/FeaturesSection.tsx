'use client';

import { Tv2, Download, Globe2, Shield, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: Tv2,
    title: 'Streaming Ultra HD 4K',
    description: 'Profitez de vos contenus en qualité 4K avec un son Dolby Atmos. Une expérience cinématographique chez vous.',
    color: '#FFD700',
  },
  {
    icon: Download,
    title: 'Téléchargement hors-ligne',
    description: 'Téléchargez vos films et séries favoris pour les regarder sans connexion, où que vous soyez.',
    color: '#60A5FA',
  },
  {
    icon: Globe2,
    title: '50+ pays africains',
    description: 'Une bibliothèque représentant toute la diversité culturelle du continent africain et de la diaspora.',
    color: '#34D399',
  },
  {
    icon: Shield,
    title: 'Contenu exclusif & sécurisé',
    description: 'Accédez à des premières mondiales, des documentaires exclusifs et des productions originales WAWAW.',
    color: '#A78BFA',
  },
  {
    icon: Zap,
    title: 'Streaming sans interruption',
    description: 'Notre infrastructure CDN mondiale garantit un streaming fluide même dans les zones à faible débit.',
    color: '#FB923C',
  },
  {
    icon: Users,
    title: 'Profils familiaux',
    description: 'Créez jusqu\'à 5 profils personnalisés avec contrôle parental pour toute la famille.',
    color: '#F472B6',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD700] mb-3">Pourquoi WAWAW</p>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-4">
            Tout ce dont vous avez{' '}
            <span className="gradient-text">besoin</span>
          </h2>
          <p className="text-base text-white/50 leading-relaxed">
            Une plateforme pensée pour la diaspora africaine et les amoureux du cinéma africain partout dans le monde.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="group relative p-6 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Glow accent */}
              <div
                className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${color}40, transparent)` }}
              />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              <h3 className="text-base font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
