import React, { useState } from 'react';
import { Dumbbell, Clock, Flame, CheckCircle, Circle, BarChart3, ChevronRight, Play } from 'lucide-react';
import { WORKOUT_TRACKS } from '../data/mockData';

export const WorkoutTracks: React.FC = () => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>(WORKOUT_TRACKS[0].id);
  const [exerciseStatus, setExerciseStatus] = useState<Record<string, boolean>>({
    'track-1-0': true,
    'track-1-1': true,
    'track-2-0': true,
    'track-3-0': true,
    'track-3-1': true,
    'track-3-2': true,
  });

  const activeTrack = WORKOUT_TRACKS.find((t) => t.id === selectedTrackId) || WORKOUT_TRACKS[0];

  const toggleExercise = (exerciseKey: string) => {
    setExerciseStatus((prev) => ({
      ...prev,
      [exerciseKey]: !prev[exerciseKey],
    }));
  };

  const completedCount = activeTrack.exercises.filter((_, idx) =>
    exerciseStatus[`${activeTrack.id}-${idx}`]
  ).length;

  const progressPercent = Math.round((completedCount / activeTrack.exercises.length) * 100);

  return (
    <section id="tracks" className="py-20 md:py-28 bg-neutral-950/80 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
              <span>Structured Periodization</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Daily Training Tracks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
              Curated Workout Tracks
            </h2>
            <p className="mt-4 text-neutral-400 text-base sm:text-lg">
              Never wonder what to do on the gym floor. Select your track, track progressive overload sets, and log your completions directly from your phone.
            </p>
          </div>

          {/* Interactive track selector tabs */}
          <div className="mt-6 lg:mt-0 flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto max-w-full">
            {WORKOUT_TRACKS.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrackId(track.id)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedTrackId === track.id
                    ? 'bg-amber-400 text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>{track.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Workout Track Main Showcase Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Track Details & Exercise Progression */}
          <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-amber-400 block mb-1">
                  Active Focus: {activeTrack.focus}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white font-heading">
                  {activeTrack.name}
                </h3>
              </div>

              {/* Track Metadata - unboxed */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="tabular-nums">{activeTrack.durationMin} Mins</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>{activeTrack.intensity} Intensity</span>
                </div>
              </div>
            </div>

            {/* Interactive Progress Bar */}
            <div className="py-6 border-b border-neutral-800">
              <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                <span className="text-neutral-300 font-medium">Session Progress</span>
                <span className="font-mono font-bold text-amber-400 tabular-nums">
                  {completedCount} / {activeTrack.exercises.length} Completed ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Exercise List */}
            <div className="pt-6 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                  Exercises & Biomechanics Target
                </span>
                <span className="text-xs text-neutral-400">
                  Tap checkmark to log set completion
                </span>
              </div>

              {activeTrack.exercises.map((exercise, index) => {
                const isCompleted = !!exerciseStatus[`${activeTrack.id}-${index}`];
                return (
                  <div
                    key={index}
                    onClick={() => toggleExercise(`${activeTrack.id}-${index}`)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer select-none ${
                      isCompleted
                        ? 'bg-neutral-950/70 border-emerald-500/40 text-neutral-300'
                        : 'bg-neutral-950/40 border-neutral-800 hover:border-neutral-700 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <button
                        type="button"
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500 text-neutral-950'
                            : 'bg-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                        aria-label={`Mark ${exercise.name} as complete`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>

                      <div>
                        <p
                          className={`text-sm sm:text-base font-semibold transition-all ${
                            isCompleted ? 'line-through text-neutral-400' : 'text-white'
                          }`}
                        >
                          {exercise.name}
                        </p>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Target: {exercise.sets} sets · {exercise.repsOrTime}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono tabular-nums text-neutral-300">
                        {exercise.sets} × {exercise.repsOrTime}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Coach Programming & Equipment Allocation */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h4 className="text-base font-bold uppercase tracking-tight text-white font-heading mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span>Coach Programming Notes</span>
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                "Keep rest intervals to 90 seconds on compound working sets. Log RPE (Rate of Perceived Exertion) between 7.5 to 8.5 to maintain progressive neural drive."
              </p>
              <div className="pt-4 border-t border-neutral-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  RS
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Rahul Sharma</p>
                  <p className="text-[11px] text-neutral-400">Head Strength Coach</p>
                </div>
              </div>
            </div>

            {/* Quick Floor Reservation Info */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-2">
                Scheduled Slot Today
              </span>
              <p className="text-lg font-bold text-white font-heading">
                06:00 PM · Strength Platform 3
              </p>
              <p className="text-xs text-neutral-400 mt-1 mb-4">
                Reserved under Devin Cole (ID: KIN-8829-DX)
              </p>
              <a
                href="#dashboard"
                className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold uppercase tracking-wider text-neutral-200 border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View In Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
