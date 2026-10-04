import React, { useState } from 'react';
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/mockData';

interface MembershipPlansProps {
  onSelectPlan: (planId: string) => void;
}

export const MembershipPlans: React.FC<MembershipPlansProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const comparisonFeatures = [
    { name: 'Standard Gym Floor Access', basic: 'Non-Peak', premium: '24/7 Unlimited', elite: '24/7 VIP Access' },
    { name: 'Strength & Olympic Platforms', basic: false, premium: true, elite: true },
    { name: 'Personal Coach Guidance', basic: false, premium: 'Quarterly Review', elite: '2 Sessions / Week' },
    { name: 'Flexible Slot Reservations', basic: 'Standard', premium: 'Priority', elite: 'Guaranteed' },
    { name: 'Sauna & Hydrotherapy Suite', basic: false, premium: true, elite: 'Private Unlimited' },
    { name: 'Complimentary Guest Passes', basic: 'None', premium: '2 / Month', elite: 'Unlimited' },
    { name: 'Digital Pass & Mobile Portal', basic: true, premium: true, elite: true },
    { name: 'Nutrition Biometric Scan', basic: false, premium: 'Once / Quarter', elite: 'Monthly InBody' },
  ];

  return (
    <section id="plans" className="py-20 md:py-28 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
            <span>Membership Tiers</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
            Choose Your Level Of Commitment
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Straightforward pricing with no hidden joining fees, no lock-in contracts, and a full 7-day money-back guarantee.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Billed Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual Pass</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isPopular = plan.popular;
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-neutral-900 border-2 border-amber-400 shadow-2xl shadow-amber-400/10 md:-translate-y-2'
                    : 'bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-neutral-950 text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                {/* Card Top */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-heading">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 min-h-[40px] mb-6">
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline gap-1.5 pb-6 mb-6 border-b border-neutral-800">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tabular-nums tracking-tight font-heading">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-medium text-neutral-400">
                      / month
                    </span>
                  </div>

                  {/* Included features */}
                  <div className="space-y-3.5 mb-8">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                      Plan Inclusions
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-neutral-200">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}

                    {/* Not included items if any */}
                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <div className="pt-2 space-y-3 opacity-60">
                        {plan.notIncluded.map((feat, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                            <X className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                            <span className="leading-snug line-through">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom / CTA */}
                <div className="p-6 sm:p-8 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-150 active:scale-98 ${
                      isPopular
                        ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-lg shadow-amber-400/25'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[11px] text-neutral-400 mt-3">
                    Instant access pass generated upon confirmation
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="mt-16 rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-heading">
                Detailed Plan Feature Matrix
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                Compare amenities, coaching allocations, and access privileges side-by-side.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Access Guarantee</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950/40 text-neutral-400 uppercase text-xs tracking-wider">
                  <th className="py-4 px-6 font-semibold">Amenity / Feature</th>
                  <th className="py-4 px-6 font-semibold text-center w-36">Basic</th>
                  <th className="py-4 px-6 font-semibold text-center w-36 text-amber-400">Premium</th>
                  <th className="py-4 px-6 font-semibold text-center w-36">Elite Athlete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-neutral-200">
                      {row.name}
                    </td>

                    {/* Basic */}
                    <td className="py-4 px-6 text-center text-neutral-400 font-mono text-xs">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-neutral-600 mx-auto" />
                        )
                      ) : (
                        row.basic
                      )}
                    </td>

                    {/* Premium */}
                    <td className="py-4 px-6 text-center text-white font-semibold font-mono text-xs bg-amber-400/5">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <Check className="w-4 h-4 text-amber-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-neutral-600 mx-auto" />
                        )
                      ) : (
                        row.premium
                      )}
                    </td>

                    {/* Elite */}
                    <td className="py-4 px-6 text-center text-neutral-300 font-mono text-xs">
                      {typeof row.elite === 'boolean' ? (
                        row.elite ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-neutral-600 mx-auto" />
                        )
                      ) : (
                        row.elite
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
