import { Smartphone, Star, Download } from 'lucide-react';

export function AppDownloadSection() {
  return (
    <section className="py-24 sm:py-32" id="app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFD700]/10 via-[#1A1A1A] to-[#0A0A0A] border border-[#FFD700]/20 p-8 sm:p-12 lg:p-16">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD700]/3 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD700] mb-4">Application mobile</p>
              <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-4">
                WAWAW dans votre<br />
                <span className="gradient-text">poche</span>
              </h2>
              <p className="text-base text-white/50 leading-relaxed mb-8 max-w-lg">
                Téléchargez l'application WAWAW et accédez à tout le catalogue depuis votre téléphone.
                Disponible sur iOS et Android.
              </p>

              {/* Store badges */}
              <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-5 py-3 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.28-2.18 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Télécharger sur</p>
                    <p className="text-sm font-bold text-white">App Store</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-5 py-3 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.18 23.76c.3.17.65.18.96.03l12.45-7.19-2.68-2.68-10.73 9.84zm-1.32-19.5c-.09.21-.14.45-.14.72v18.04c0 .27.05.51.14.72l.09.08 10.1-10.1v-.24L1.95 4.18l-.09.08zM20.45 10.4l-2.77-1.6-3.01 3.01 3.01 3.01 2.8-1.62c.8-.46.8-1.22-.03-1.8zm-17.59 9.6l10.73-9.84-2.68-2.68L3.18.76C2.87.61 2.52.62 2.22.79c-.62.36-.62 1.41-.03 1.87z"/>
                  </svg>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Disponible sur</p>
                    <p className="text-sm font-bold text-white">Google Play</p>
                  </div>
                </a>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="text-[#FFD700] fill-[#FFD700]" />
                  ))}
                </div>
                <p className="text-sm text-white/50">
                  <span className="font-bold text-white">4.8/5</span> — Plus de 10 000 avis
                </p>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="relative shrink-0">
              <div className="w-48 h-96 rounded-[2.5rem] bg-[#0F0F0F] border-4 border-white/10 flex items-center justify-center shadow-2xl">
                <div className="flex flex-col items-center gap-3 text-center px-4">
                  <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center">
                    <Smartphone size={32} className="text-black" />
                  </div>
                  <p className="text-xs font-bold text-white tracking-widest">WAWAW</p>
                  <p className="text-[10px] text-white/30">Application mobile</p>
                </div>
              </div>
              {/* Glow under phone */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#FFD700]/20 blur-xl rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
