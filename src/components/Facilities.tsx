import React from 'react';
import { Dumbbell, Shield, Compass, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

export const Facilities: React.FC = () => {
  const highlights = [
    {
      title: 'Olympic Weightlifting Platforms',
      desc: 'Four dedicated Eleiko IWF-certified lifting stations with competition rubber discs and sound-dampening subfloors.',
    },
    {
      title: 'Custom Strength & Dumbbell Run',
      desc: 'Dual sets from 2.5kg to 60kg in 2.5kg micro-increments with ergonomically knurled stainless steel handles.',
    },
    {
      title: 'Endurance & VO2 Max Zone',
      desc: 'Woodway curved treadmills, Concept2 RowErgs and SkiErgs, assault bikes, and real-time heart rate displays.',
    },
    {
      title: 'Contrast Therapy & Recovery',
      desc: 'Finnish cedar dry sauna, infrared muscle recovery booths, and chilled 48°F plunge pools to hasten tissue repair.',
    },
  ];

  return (
    <section id="facility" className="py-20 md:py-28 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Image with architectural feel */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src="/src/assets/images/facility_strength_zone_1791061823328.jpg"
                alt="Kinetic premium athletic facility strength floor"
                className="w-full h-[400px] sm:h-[480px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800">
                <p className="text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold">
                  Facility Standard
                </p>
                <p className="text-base font-bold text-white font-heading mt-0.5">
                  12,000 Sq. Ft. Precision Athletic Floor
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Air filtered with medical-grade HEPA circulation and climate controlled to 68°F.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Highlights & Philosophy */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
              <span>Purpose-Built Environment</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>No Clutter</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
              Built For Serious Training
            </h2>
            <p className="mt-4 text-neutral-400 text-base leading-relaxed">
              Every square foot of Kinetic is designed for performance. No crowded machine aisles or broken cables. We invest in competition-grade hardware so you never wait for an open station.
            </p>

            <div className="mt-8 space-y-6">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-heading">
                      {h.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-0.5 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Sanitized hourly
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Keycard & NFC entry
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Locker suites & rain showers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
