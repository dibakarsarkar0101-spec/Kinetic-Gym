import React from 'react';
import { ArrowRight, CheckCircle2, Flame, ShieldAlert, Award, Clock } from 'lucide-react';

interface HeroProps {
  onStartJourney: () => void;
  onExplorePlans: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onExplorePlans }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Athletic kicker metadata - no pill box, clean unboxed text */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-amber-400 uppercase mb-4">
              <span>High-Performance Athletic Club</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>24/7 Access</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Certified Coaches</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] text-balance mb-6">
              TRAIN HARD.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                LIVE STRONG.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-xl leading-relaxed mb-8">
              A smarter fitness experience built around your goals. Centralize your workout tracking, dedicated coach scheduling, and digital gym pass in one seamless platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={onStartJourney}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold uppercase tracking-wider text-sm transition-all duration-150 shadow-lg shadow-amber-400/25 active:scale-98 whitespace-nowrap"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExplorePlans}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-100 border border-neutral-700 font-semibold text-sm transition-all duration-150 active:scale-98 whitespace-nowrap"
              >
                <span>Explore Plans</span>
              </button>
            </div>

            {/* Adjacent Proof of Impact */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800/80 w-full max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight font-heading">
                  18+
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">Average monthly workouts per member</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight font-heading">
                  94.6%
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">Member renewal & goal retention</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight font-heading">
                  100%
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">Certified CSCS coaching staff</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
              <img
                src="/src/assets/images/hero_gym_workout_1791061810380.jpg"
                alt="Athlete executing strength lift in a high-end gym facility"
                className="w-full h-[360px] sm:h-[440px] lg:h-[500px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

              {/* Inset live status card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Floor Status · Live
                    </span>
                  </div>
                  <span className="text-xs font-mono text-amber-400 tabular-nums font-semibold">
                    Optimal Capacity
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span>Olympic Platforms: 4 open</span>
                  <span className="text-neutral-500">·</span>
                  <span>Strength Zone: Open 24/7</span>
                </div>
              </div>
            </div>

            {/* Floating accent badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-neutral-900 border border-neutral-700/80 rounded-xl p-3.5 shadow-xl items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">Next Peak Session</p>
                <p className="text-sm font-bold text-white">06:00 PM · Strength Track</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
