import React, { useState } from 'react';
import { Star, Award, Calendar, Check, ArrowRight, UserCheck } from 'lucide-react';
import { TRAINERS } from '../data/mockData';
import { Trainer } from '../types/gym';

export const Trainers: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [bookedTrainerName, setBookedTrainerName] = useState<string | null>(null);

  const handleBookConsultation = (trainer: Trainer) => {
    setBookedTrainerName(trainer.name);
    setTimeout(() => {
      setBookedTrainerName(null);
    }, 4000);
  };

  return (
    <section id="coaches" className="py-20 md:py-28 bg-neutral-950/60 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
            <span>Coaching Excellence</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>CSCS Certified Mentors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
            Meet Your Personal Coaches
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            No uncredentialed floor assistants. Every trainer is a certified strength practitioner dedicated to monitoring your form, volume, and recovery.
          </p>
        </div>

        {/* Global Toast when consultation is clicked */}
        {bookedTrainerName && (
          <div className="mb-8 p-4 rounded-xl bg-amber-400 text-neutral-950 font-semibold text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>
                Introductory consultation request sent to Coach {bookedTrainerName}. Check your portal schedule.
              </span>
            </div>
            <button
              onClick={() => setBookedTrainerName(null)}
              className="text-xs font-bold uppercase underline"
            >
              Close
            </button>
          </div>
        )}

        {/* 3 Trainer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Photo container */}
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                  <img
                    src={trainer.image}
                    alt={`${trainer.name} - ${trainer.role}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />

                  {/* Rating indicator */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-neutral-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-mono font-bold text-white tabular-nums">
                      {trainer.rating}
                    </span>
                    <span className="text-neutral-500 text-[10px]">·</span>
                    <span className="text-[11px] text-neutral-300 font-medium">
                      {trainer.clientCount} Active Athletes
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white font-heading">
                    {trainer.name}
                  </h3>
                  <p className="text-xs font-mono text-amber-400 mt-1 mb-3">
                    {trainer.role}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Specialization
                  </p>
                  <p className="text-sm font-medium text-neutral-200 mb-4">
                    {trainer.specialization}
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                    {trainer.bio}
                  </p>

                  {/* Today's Open Slots */}
                  <div className="mt-4 pt-4 border-t border-neutral-800">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                      Available Consultation Windows
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {trainer.slotsToday.map((slot, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-300"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleBookConsultation(trainer)}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold uppercase tracking-wider text-xs border border-neutral-700 flex items-center justify-center gap-2 transition-colors active:scale-98"
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>Request Coach Intro</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
