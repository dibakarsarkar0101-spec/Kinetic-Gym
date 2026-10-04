import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  CheckCircle,
  ArrowRight,
  UserCheck,
  Sparkles,
  QrCode,
  RefreshCw,
  Database,
  AlertCircle,
  Phone,
  Calendar,
  Check
} from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/mockData';
import { saveMemberToFirestore, FirestoreMember } from '../firebase/services';

interface RegistrationFormProps {
  selectedPlanId: string;
  onPlanChange: (planId: string) => void;
  onRegistrationComplete: (memberDetails: {
    name: string;
    email: string;
    phone: string;
    plan: string;
    preferredTime: string;
    memberId: string;
    joinDate: string;
    activeStatus: string;
  }) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  selectedPlanId,
  onPlanChange,
  onRegistrationComplete,
}) => {
  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('Evening (05:00 PM - 08:00 PM)');
  const [primaryGoal, setPrimaryGoal] = useState('Strength & Hypertrophy');

  // Validation and status states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [registeredMember, setRegisteredMember] = useState<{
    name: string;
    email: string;
    phone: string;
    plan: string;
    preferredTime: string;
    memberId: string;
    joinDate: string;
    activeStatus: string;
  } | null>(null);

  const selectedPlan =
    MEMBERSHIP_PLANS.find((p) => p.id === selectedPlanId) || MEMBERSHIP_PLANS[1];

  const timeOptions = [
    'Morning (06:00 AM - 09:00 AM)',
    'Mid-Day (11:00 AM - 02:00 PM)',
    'Evening (05:00 PM - 08:00 PM)',
    'Night (08:00 PM - 11:00 PM)',
  ];

  const goalOptions = [
    'Strength & Hypertrophy',
    'Athletic VO2 Conditioning',
    'Fat Loss & Recomposition',
    'Mobility & Injury Recovery',
  ];

  /**
   * Handle form submission and save member into Firebase Firestore.
   * 
   * Steps:
   * 1. Validate required fields (Full name, valid email, phone number)
   * 2. Prepare member data object with name, phone, plan, joinDate, activeStatus
   * 3. Call saveMemberToFirestore() to send data to the cloud database
   * 4. If successful: show the clear success screen with saved member pass
   * 5. If failed: display a friendly error message and allow user to retry
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Basic beginner input validations
    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full legal name.';
    }
    if (!email.trim() || !email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSaveErrorMessage(null);
    setIsSubmitting(true);

    // Format clean member information
    const cleanName = fullName.trim();
    const prefix = cleanName.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || 'DX';
    const generatedId = `KIN-${Math.floor(1000 + Math.random() * 9000)}-${prefix}`;
    const todayIso = new Date().toISOString().split('T')[0];

    // Data packet sent to Firebase Firestore
    // Required fields: name, phone, membership plan, join date, active status
    const firestorePayload: FirestoreMember = {
      id: generatedId,
      name: cleanName,
      phone: phone.trim(),
      phoneNumber: phone.trim(),
      email: email.trim(),
      membershipPlan: selectedPlan.name,
      preferredTime,
      joinDate: todayIso,
      activeStatus: 'ACTIVE',
    };

    try {
      // Save data directly into Firestore 'members' collection
      await saveMemberToFirestore(firestorePayload);

      const memberInfo = {
        name: cleanName,
        email: email.trim(),
        phone: phone.trim(),
        plan: selectedPlan.name,
        preferredTime,
        memberId: generatedId,
        joinDate: todayIso,
        activeStatus: 'ACTIVE',
      };

      // Show the clear success message
      setRegisteredMember(memberInfo);
      onRegistrationComplete(memberInfo);
    } catch (err: any) {
      console.error('Error saving member to Firestore:', err);
      // Show simple friendly error message if saving fails
      setSaveErrorMessage(
        'Unable to save member data to Firebase Firestore. Please check your network connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setRegisteredMember(null);
    setSaveErrorMessage(null);
    setFullName('');
    setEmail('');
    setPhone('');
  };

  return (
    <section id="register" className="py-20 md:py-28 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
            <span>Instant Digital Onboarding</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Zero Paperwork</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
            Register Your Membership
          </h2>
          <p className="mt-3 text-neutral-400 text-base">
            Complete enrollment in 60 seconds. Your digital access pass is issued immediately with no registration fees.
          </p>
        </div>

        {/* If registered successfully, display digital pass confirmation */}
        {registeredMember ? (
          <div className="bg-neutral-900 border-2 border-amber-400/80 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-amber-400/10 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Registration Successful
            </span>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
              <Database className="w-3.5 h-3.5" />
              <span>Saved to Firebase Firestore (collection: "members")</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-heading mb-2">
              Welcome To Kinetic, {registeredMember.name}!
            </h3>
            <p className="text-sm text-neutral-300 max-w-lg mx-auto mb-6">
              Your member information is now securely stored in Firebase Firestore. Even after refreshing the page, your member information remains saved!
            </p>

            {/* Generated Pass Preview with All Required Fields */}
            <div className="max-w-md mx-auto bg-neutral-950 rounded-xl border border-neutral-800 p-6 text-left mb-8 shadow-inner">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <p className="text-[10px] uppercase font-mono text-amber-400 font-bold">
                    Kinetic Member Credential
                  </p>
                  <p className="text-base font-bold text-white font-heading">
                    {registeredMember.name}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {registeredMember.activeStatus}
                  </span>
                </div>
              </div>

              {/* The 5 Required Fields */}
              <div className="grid grid-cols-2 gap-4 py-4 text-xs font-mono border-b border-neutral-800/80">
                <div>
                  <span className="text-neutral-500 block">Name</span>
                  <span className="text-white font-bold">{registeredMember.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Phone Number</span>
                  <span className="text-white font-bold">{registeredMember.phone}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Membership Plan</span>
                  <span className="text-amber-400 font-bold">{registeredMember.plan}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Join Date</span>
                  <span className="text-neutral-200 font-bold">{registeredMember.joinDate}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Active Status</span>
                  <span className="text-emerald-400 font-bold">{registeredMember.activeStatus}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Member ID</span>
                  <span className="text-neutral-300">{registeredMember.memberId}</span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-neutral-400">
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Persisted in Cloud Database</span>
                </span>
                <QrCode className="w-5 h-5 text-neutral-400" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#dashboard"
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-400/20 transition-all text-center"
              >
                Go To Member Dashboard
              </a>
              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Register Another Member</span>
              </button>
            </div>
          </div>
        ) : (
          /* Enrollment Form */
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {/* Trust Reassurance Banner */}
            <div className="mb-8 p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <Database className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Connected to Firebase Firestore Database ("members" collection)</span>
              </div>
              <div className="flex items-center gap-4 text-neutral-400">
                <span>✓ Persistent Memory</span>
                <span>✓ 7-Day Money Back</span>
                <span>✓ Instant QR Pass</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Error Message Alert Banner if saving fails */}
              {saveErrorMessage && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm flex items-start justify-between gap-3 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-red-300">Registration Save Failed</p>
                      <p className="text-xs text-red-300/90 mt-0.5">{saveErrorMessage}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSaveErrorMessage(null)}
                    className="text-xs font-bold text-red-400 hover:text-red-200 uppercase tracking-wider shrink-0 underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}
              {/* Field 1: Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2"
                >
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder="e.g. Rahul Sharma or Devin Cole"
                  className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-neutral-800 focus:border-amber-400'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                )}
              </div>

              {/* Field 2 & 3: Email and Phone in responsive 2-column or stacked */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2"
                  >
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2"
                  >
                    Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-neutral-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Field 4: Membership Plan Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                  Membership Plan Selection <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MEMBERSHIP_PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => onPlanChange(plan.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedPlanId === plan.id
                          ? 'bg-amber-400/10 border-amber-400 text-white shadow-sm'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm uppercase">{plan.name}</span>
                        {plan.popular && (
                          <span className="text-[10px] font-bold uppercase text-amber-400">
                            ★ Top
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-xs font-semibold text-neutral-200">
                        ₹{plan.priceMonthly.toLocaleString('en-IN')}/mo
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Field 5: Preferred Workout Time Slot */}
              <div>
                <label
                  htmlFor="preferredTime"
                  className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2"
                >
                  Preferred Workout Slot
                </label>
                <select
                  id="preferredTime"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm sm:text-base text-white focus:outline-none focus:border-amber-400"
                >
                  {timeOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-neutral-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-neutral-400">
                  You can change or flex this anytime in your member portal schedule.
                </p>
              </div>

              {/* Field 6: Primary Goal */}
              <div>
                <label
                  htmlFor="primaryGoal"
                  className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2"
                >
                  Primary Fitness Focus
                </label>
                <select
                  id="primaryGoal"
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm sm:text-base text-white focus:outline-none focus:border-amber-400"
                >
                  {goalOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-neutral-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Summary box before submitting */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 block">Total Due Today</span>
                  <span className="text-2xl font-black text-white font-mono tabular-nums">
                    ₹{selectedPlan.priceMonthly.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 block font-semibold">
                    Zero Joining Fee
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Includes First 30 Days Full Access
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-neutral-950 font-bold uppercase tracking-wider text-sm sm:text-base shadow-xl shadow-amber-400/20 transition-all duration-150 active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Generating Secure Digital Pass...</span>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-neutral-400">
                  By completing registration, you agree to the Kinetic Club Guidelines & Code of Conduct.
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
