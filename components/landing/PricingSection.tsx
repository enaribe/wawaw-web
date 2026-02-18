'use client';

import { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'free',
    name: 'Gratuit',
    price: { monthly: 0, yearly: 0 },
    description: 'Pour découvrir WAWAW',
    features: [
      'Accès aux contenus gratuits',
      'Qualité SD (480p)',
      '1 écran simultané',
      'Publicités',
      'Téléchargement limité',
    ],
    unavailable: ['Contenus premium', 'Qualité HD/4K', 'Sans publicité'],
    cta: 'Commencer gratuitement',
    variant: 'outline' as const,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: { monthly: 2990, yearly: 29900 },
    description: 'Pour les passionnés',
    features: [
      'Tout le catalogue',
      'Qualité HD (1080p)',
      '2 écrans simultanés',
      'Sans publicité',
      'Téléchargements illimités',
      '3 profils',
    ],
    unavailable: ['Qualité 4K Ultra HD', 'Avant-premières'],
    cta: 'Choisir Standard',
    variant: 'outline' as const,
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: { monthly: 4990, yearly: 49900 },
    description: 'L\'expérience ultime',
    features: [
      'Tout le catalogue',
      'Qualité 4K Ultra HD + Dolby',
      '4 écrans simultanés',
      'Sans publicité',
      'Téléchargements illimités',
      '5 profils',
      'Avant-premières exclusives',
      'Accès aux événements en ligne',
    ],
    unavailable: [],
    cta: 'Choisir Premium',
    variant: 'primary' as const,
  },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-24 sm:py-32 bg-[#080808]" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD700] mb-3">Tarifs</p>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-4">
            Des prix <span className="gradient-text">accessibles</span>
          </h2>
          <p className="text-base text-white/50 leading-relaxed">
            Payez par Mobile Money (Orange Money, Wave, MTN...), carte bancaire ou PayPal.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={cn('text-sm font-medium', !yearly ? 'text-white' : 'text-white/40')}>Mensuel</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={cn(
              'relative w-12 h-6 rounded-full border transition-colors duration-200',
              yearly ? 'bg-[#FFD700] border-[#FFD700]' : 'bg-white/10 border-white/20'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
                yearly && 'translate-x-6'
              )}
            />
          </button>
          <span className={cn('text-sm font-medium', yearly ? 'text-white' : 'text-white/40')}>
            Annuel{' '}
            <span className="text-[#FFD700] font-bold ml-1">-17%</span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative rounded-2xl p-6 border transition-all duration-300',
                plan.popular
                  ? 'bg-[#FFD700]/5 border-[#FFD700]/30 scale-[1.02]'
                  : 'bg-[#0F0F0F] border-white/5 hover:border-white/10'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#FFD700] text-black text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
                  <Zap size={10} className="fill-black" />
                  Le plus populaire
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-bold text-white/60 mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  {plan.price.monthly === 0 ? (
                    <span className="text-3xl font-black text-white">Gratuit</span>
                  ) : (
                    <>
                      <span className="text-3xl font-black text-white">
                        {(yearly ? plan.price.yearly / 12 : plan.price.monthly).toLocaleString('fr-FR')}
                      </span>
                      <span className="text-sm text-white/40">FCFA/mois</span>
                    </>
                  )}
                </div>
                {yearly && plan.price.yearly > 0 && (
                  <p className="text-xs text-[#FFD700]">
                    Facturé {plan.price.yearly.toLocaleString('fr-FR')} FCFA/an
                  </p>
                )}
                <p className="text-xs text-white/40 mt-1">{plan.description}</p>
              </div>

              <Button variant={plan.variant} size="md" className="w-full mb-6">
                {plan.cta}
              </Button>

              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={14} className="text-[#FFD700] mt-0.5 shrink-0" />
                    <span className="text-sm text-white/70">{f}</span>
                  </li>
                ))}
                {plan.unavailable.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 opacity-30">
                    <span className="w-3.5 h-3.5 mt-0.5 shrink-0 text-center text-xs leading-none">×</span>
                    <span className="text-sm text-white/50 line-through">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/30 mt-8">
          Paiement sécurisé · Annulation à tout moment · Pas d'engagement
        </p>
      </div>
    </section>
  );
}
