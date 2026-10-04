import React from 'react';
import { Dumbbell, Calendar, UserCheck, Activity, ShieldCheck, Zap } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Dumbbell,
      title: 'Competition-Grade Equipment',
      description:
        'Machined Eleiko barbells, competition bumper plates, custom power racks, and calibrated dumbbell runs up to 60kg for serious progressive overload.',
    },
    {
      icon: Calendar,
      title: 'Frictionless Slot Reservation',
      description:
        'Never wait for equipment or ask over WhatsApp. Real-time floor occupancy and instant slot reservations keep your workout on schedule.',
    },
    {
      icon: UserCheck,
      title: 'Dedicated CSCS Coaching',
      description:
        'Every member is paired with a certified personal coach who designs your cycle, monitors biomechanics, and conducts structured quarterly reviews.',
    },
    {
      icon: Activity,
      title: 'Targeted Workout Tracks',
      description:
        'Follow structured periodization tracks—from heavy barbell strength to metabolic conditioning—with built-in set and rep tracking in your portal.',
    },
    {
      icon: Zap,
      title: 'Immediate Digital Access Pass',
      description:
        'Zero physical plastic cards or lost tags. Tap your secure encrypted digital pass from your phone for instant entry and locker access.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Membership Control',
      description:
        'No hidden cancellation penalties or fine-print traps. Pause, upgrade, or review membership expiry dates in your personal dashboard anytime.',
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-neutral-900 bg-neutral-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
            <span>The Kinetic Standard</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Why Athletes Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
            Engineered For Consistent Progress
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            We eliminated the friction of outdated gym management—no manual spreadsheets, no phone tag, just relentless focus on physical output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-6 sm:p-8 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-105 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-heading tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
