import { UserPlus, CreditCard, Play } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Créez votre compte',
    description: 'Inscrivez-vous gratuitement en moins de 2 minutes. Aucune carte bancaire requise pour démarrer.',
  },
  {
    number: '02',
    icon: CreditCard,
    title: 'Choisissez votre plan',
    description: 'Sélectionnez l\'abonnement qui vous convient. Paiement par Mobile Money, carte bancaire ou PayPal.',
  },
  {
    number: '03',
    icon: Play,
    title: 'Regardez & profitez',
    description: 'Accédez immédiatement à tout le catalogue. Sur téléphone, tablette, TV ou navigateur.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD700] mb-3">Comment ça marche</p>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-4">
            Simple comme{' '}
            <span className="gradient-text">bonjour</span>
          </h2>
          <p className="text-base text-white/50 leading-relaxed">
            Commencez à regarder vos contenus africains préférés en 3 étapes simples.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map(({ number, icon: Icon, title, description }, i) => (
              <div key={number} className="relative text-center group">
                {/* Step number */}
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center group-hover:bg-[#FFD700]/15 transition-colors duration-300">
                    <Icon size={28} className="text-[#FFD700]" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#FFD700] flex items-center justify-center text-xs font-black text-black">
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-xs mx-auto">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
