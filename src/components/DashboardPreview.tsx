import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  ShieldCheck,
  CheckCircle,
  Bell,
  Activity,
  QrCode,
  Users,
  Search,
  Plus,
  ChevronRight,
  TrendingUp,
  Award,
  AlertCircle,
  Database
} from 'lucide-react';
import { RoleType, ScheduleSlot } from '../types/gym';
import {
  CURRENT_MEMBER_DEMO,
  SCHEDULE_SLOTS,
  MOCK_NOTIFICATIONS,
  ADMIN_STATS,
  ADMIN_MEMBER_DIRECTORY,
  TRAINER_ASSIGNED_CLIENTS,
} from '../data/mockData';
import { OccupancyChart } from './OccupancyChart';
import {
  subscribeToMembers,
  subscribeToAnnouncements,
  FirestoreMember,
  FirestoreAnnouncement,
} from '../firebase/services';

interface DashboardPreviewProps {
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  onOpenRegisterModal: () => void;
  activeMember?: {
    name: string;
    email: string;
    phone: string;
    plan: string;
    preferredTime: string;
    memberId: string;
  } | null;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  currentRole,
  onRoleChange,
  onOpenRegisterModal,
  activeMember,
}) => {
  const [slots, setSlots] = useState<ScheduleSlot[]>(SCHEDULE_SLOTS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);
  const [trainerCheckInStatus, setTrainerCheckInStatus] = useState<Record<string, boolean>>({
    'KIN-8829-DX': true,
  });
  const [firestoreMembers, setFirestoreMembers] = useState<FirestoreMember[]>([]);
  const [firestoreAnnouncements, setFirestoreAnnouncements] = useState<FirestoreAnnouncement[]>([]);

  useEffect(() => {
    // Real-time listener for Firestore members
    const unsubMembers = subscribeToMembers((members) => {
      setFirestoreMembers(members);
    });

    // Real-time listener for Firestore announcements
    const unsubAnnouncements = subscribeToAnnouncements((ann) => {
      if (ann && ann.length > 0) {
        setFirestoreAnnouncements(ann);
      }
    });

    return () => {
      unsubMembers();
      unsubAnnouncements();
    };
  }, []);

  const handleBookSlot = (slotId: string) => {
    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            status: slot.status === 'Available' ? 'Booked' : 'Available',
            spotsLeft: slot.status === 'Available' ? slot.spotsLeft - 1 : slot.spotsLeft + 1,
          };
        }
        return slot;
      })
    );
    setBookingSuccessMsg('Slot updated successfully!');
    setTimeout(() => setBookingSuccessMsg(null), 3000);
  };

  const handleMarkNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const toggleClientCheckIn = (clientId: string) => {
    setTrainerCheckInStatus((prev) => ({
      ...prev,
      [clientId]: !prev[clientId],
    }));
  };

  // Combine real-time Firestore members with baseline demo directory
  const combinedMembers = [
    ...firestoreMembers.map((fm) => ({
      id: fm.id,
      name: fm.name,
      plan: fm.membershipPlan,
      status: fm.activeStatus || 'ACTIVE',
      trainer: 'Rahul Sharma',
      daysLeft: 30,
      attendance: 'Active (Firestore Synced)',
      isRealtimeFirestore: true,
      phone: fm.phone,
      joinDate: fm.joinDate,
    })),
    ...ADMIN_MEMBER_DIRECTORY.filter((m) => !firestoreMembers.some((fm) => fm.id === m.id)),
  ];

  const filteredMembers = combinedMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
      m.plan.toLowerCase().includes(memberSearchQuery.toLowerCase())
  );

  const currentMemberName = activeMember?.name || CURRENT_MEMBER_DEMO.name;
  const currentMemberId = activeMember?.memberId || CURRENT_MEMBER_DEMO.id;
  const currentMemberPlan = activeMember?.plan || CURRENT_MEMBER_DEMO.membershipPlan;
  const totalMemberCount = ADMIN_STATS.totalMembers + firestoreMembers.length;

  return (
    <section id="dashboard" className="py-20 md:py-28 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
              <span>Interactive Portal Preview</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Day 2 Demonstration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
              Your Fitness Dashboard
            </h2>
            <p className="mt-3 text-neutral-400 text-base max-w-xl">
              Experience the unified management platform. Switch roles below to preview how Members, Trainers, and Admins operate without spreadsheet friction.
            </p>
          </div>

          {/* Role Switcher Pill Bar */}
          <div className="mt-6 md:mt-0 flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl self-start md:self-auto">
            <button
              type="button"
              onClick={() => onRoleChange('member')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                currentRole === 'member'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Member View</span>
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('trainer')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                currentRole === 'trainer'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Trainer View</span>
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('admin')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                currentRole === 'admin'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin View</span>
            </button>
          </div>
        </div>

        {/* Global Toast for Booking updates */}
        {bookingSuccessMsg && (
          <div className="mb-6 p-4 rounded-xl bg-amber-400 text-neutral-950 font-semibold text-sm flex items-center justify-between shadow-lg shadow-amber-400/20">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-neutral-950" />
              <span>{bookingSuccessMsg}</span>
            </div>
            <button
              onClick={() => setBookingSuccessMsg(null)}
              className="text-xs font-bold uppercase underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* ROLE 1: MEMBER DASHBOARD */}
        {/* ============================================================== */}
        {currentRole === 'member' && (
          <div className="space-y-8">
            {/* 4 Core Metric Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Active Days */}
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Active Days
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white tabular-nums font-heading">
                    {CURRENT_MEMBER_DEMO.activeDaysThisMonth}
                  </span>
                  <span className="text-xs text-amber-400 font-medium font-mono">
                    / 22 Target
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-2">
                  This Month · Consistent Streak
                </p>
              </div>

              {/* Next Slot */}
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Next Slot
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  6:00 PM
                </div>
                <p className="text-xs text-amber-400 font-mono mt-2">
                  Today · Upper Body Hypertrophy
                </p>
              </div>

              {/* Membership Status */}
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Membership Status
                </span>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-2xl font-extrabold text-white font-heading uppercase tracking-wide">
                    {CURRENT_MEMBER_DEMO.membershipStatus}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mt-2 font-mono">
                  {CURRENT_MEMBER_DEMO.daysLeft} Days Left · Renews Nov 1
                </p>
              </div>

              {/* Trainer */}
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Assigned Coach
                </span>
                <div className="text-xl font-extrabold text-white font-heading">
                  {CURRENT_MEMBER_DEMO.trainerName}
                </div>
                <p className="text-xs text-neutral-400 mt-2">
                  {CURRENT_MEMBER_DEMO.trainerRole} · Active Mentorship
                </p>
              </div>
            </div>

            {/* Main Content: Digital Membership Card + Upcoming Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Digital Membership Pass */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border-2 border-neutral-700/80 p-6 sm:p-7 shadow-2xl overflow-hidden group">
                  {/* Holographic accent glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header of pass */}
                  <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block font-mono">
                        Official Member Pass
                      </span>
                      <h4 className="text-xl font-black uppercase tracking-tight text-white font-heading">
                        KINETIC ATHLETIC CLUB
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                      <QrCode className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Member details inside card */}
                  <div className="py-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                          Member Name
                        </p>
                        <p className="text-lg font-bold text-white font-heading">
                          {currentMemberName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                          Tier
                        </p>
                        <p className="text-base font-bold text-amber-400 font-mono">
                          {currentMemberPlan}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                          Pass ID
                        </p>
                        <p className="text-sm font-mono text-neutral-200 tabular-nums">
                          {currentMemberId}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                          Valid Through
                        </p>
                        <p className="text-sm font-mono text-neutral-200 tabular-nums">
                          {CURRENT_MEMBER_DEMO.renewalDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Digital Barcode representation */}
                  <div className="pt-4 border-t border-neutral-800 flex flex-col items-center justify-center">
                    <div className="w-full h-10 flex items-center justify-center gap-1 opacity-75">
                      {[12, 24, 8, 16, 28, 6, 20, 14, 26, 10, 18, 22, 12, 30, 8, 14, 24, 18, 10, 26, 12, 16, 22, 8, 14].map(
                        (h, idx) => (
                          <span
                            key={idx}
                            className="bg-neutral-200 w-1 rounded-xs"
                            style={{ height: `${h + 10}px` }}
                          />
                        )
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 tracking-widest mt-2">
                      SCAN AT TURNSTILE FOR IMMEDIATE ENTRY
                    </span>
                  </div>
                </div>

                {/* Notifications Preview Widget */}
                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
                        Notifications ({notifications.filter((n) => !n.read).length} New)
                      </h4>
                    </div>
                    <span className="text-xs text-neutral-400">Live Sync</span>
                  </div>

                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleMarkNotificationRead(notif.id)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          notif.read
                            ? 'bg-neutral-950/40 border-neutral-800/60 text-neutral-400'
                            : 'bg-neutral-950 border-amber-400/30 text-neutral-200 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${notif.read ? 'text-neutral-300' : 'text-amber-400'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="text-neutral-400 line-clamp-2 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Upcoming Workout Schedule & Floor Reservations */}
              <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-heading">
                      Upcoming Workout Slots
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      Reserve your preferred training window without queueing or messaging.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>This Week's Timetable</span>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  {slots.map((slot) => {
                    const isBooked = slot.status === 'Booked';
                    const isFull = slot.status === 'Full';

                    return (
                      <div
                        key={slot.id}
                        className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isBooked
                            ? 'bg-amber-400/5 border-amber-400/40'
                            : isFull
                            ? 'bg-neutral-950/40 border-neutral-800/60 opacity-60'
                            : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-lg bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center shrink-0">
                            <span className="text-[11px] font-bold uppercase text-neutral-400">
                              {slot.day}
                            </span>
                            <span className="text-xs font-bold text-amber-400 font-mono">
                              {slot.time.split(' ')[0]}
                            </span>
                            <span className="text-[9px] text-neutral-400">
                              {slot.time.split(' ')[1]}
                            </span>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm sm:text-base font-bold text-white font-heading">
                                {slot.activity}
                              </h5>
                              {isBooked && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                  Your Slot
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-400 mt-1">
                              Coach: <span className="text-neutral-200">{slot.trainer}</span>
                            </p>
                            <p className="text-xs text-neutral-400 font-mono mt-0.5">
                              {slot.spotsLeft > 0 ? `${slot.spotsLeft} slots left` : 'Fully Booked'}
                            </p>
                          </div>
                        </div>

                        <div>
                          {isFull ? (
                            <button
                              disabled
                              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-neutral-800 text-neutral-500 text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                            >
                              Class Full
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleBookSlot(slot.id)}
                              className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                isBooked
                                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                                  : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-md shadow-amber-400/20'
                              }`}
                            >
                              {isBooked ? 'Cancel Booking' : 'Reserve Slot'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ROLE 2: TRAINER DASHBOARD */}
        {/* ============================================================== */}
        {currentRole === 'trainer' && (
          <div className="space-y-8">
            {/* Trainer Stats Header */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Assigned Athletes
                </span>
                <span className="text-4xl font-extrabold text-white tabular-nums font-heading">
                  24
                </span>
                <p className="text-xs text-neutral-400 mt-2">Active training rosters</p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Today's Scheduled Sessions
                </span>
                <span className="text-4xl font-extrabold text-amber-400 tabular-nums font-heading">
                  4
                </span>
                <p className="text-xs text-neutral-400 mt-2">Next at 06:00 PM (Devin Cole)</p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Monthly Client Attendance
                </span>
                <span className="text-4xl font-extrabold text-white tabular-nums font-heading">
                  92.8%
                </span>
                <p className="text-xs text-emerald-400 mt-2">Above gym benchmark</p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Coach Availability
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-2xl font-extrabold text-white font-heading">
                    ON DUTY
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-2">Floor 1 Strength Zone</p>
              </div>
            </div>

            {/* Assigned Members Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-heading">
                    Assigned Member Roster
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Directly monitor member training programs, attendance consistency, and next check-ins.
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400">
                  Trainer: Rahul Sharma
                </span>
              </div>

              <div className="pt-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 text-xs text-neutral-400 uppercase tracking-wider font-mono">
                      <th className="pb-3 font-semibold">Member</th>
                      <th className="pb-3 font-semibold">Goal & Focus</th>
                      <th className="pb-3 font-semibold">Current Program</th>
                      <th className="pb-3 font-semibold">Next Session</th>
                      <th className="pb-3 font-semibold text-right">Floor Check-In</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {TRAINER_ASSIGNED_CLIENTS.map((client) => {
                      const isCheckedIn = !!trainerCheckInStatus[client.id];
                      return (
                        <tr key={client.id} className="hover:bg-neutral-800/30 transition-colors">
                          <td className="py-4 font-semibold text-white">
                            <div>{client.name}</div>
                            <span className="text-xs font-mono text-neutral-400">
                              {client.id}
                            </span>
                          </td>
                          <td className="py-4 text-neutral-300">
                            <div>{client.goal}</div>
                            <span className="text-xs text-amber-400 font-mono">
                              Streak: {client.streak}
                            </span>
                          </td>
                          <td className="py-4 text-xs font-mono text-neutral-300">
                            {client.program}
                          </td>
                          <td className="py-4 text-xs font-mono text-neutral-200">
                            {client.nextSession}
                          </td>
                          <td className="py-4 text-right">
                            <button
                              type="button"
                              onClick={() => toggleClientCheckIn(client.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                isCheckedIn
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700'
                              }`}
                            >
                              {isCheckedIn ? 'Checked In' : 'Mark Arrival'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ROLE 3: ADMIN DASHBOARD */}
        {/* ============================================================== */}
        {currentRole === 'admin' && (
          <div className="space-y-8">
            {/* Admin Key Operational Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Total Active Members
                </span>
                <span className="text-4xl font-extrabold text-white tabular-nums font-heading">
                  {totalMemberCount}
                </span>
                <p className="text-xs text-neutral-400 mt-2">
                  +{28 + firestoreMembers.length} enrolled ({firestoreMembers.length} Firestore synced)
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Floor Check-Ins Today
                </span>
                <span className="text-4xl font-extrabold text-amber-400 tabular-nums font-heading">
                  {ADMIN_STATS.activeCheckIns}
                </span>
                <p className="text-xs text-neutral-400 mt-2">Peak estimated at 06:30 PM</p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Monthly Renewal Rate
                </span>
                <span className="text-4xl font-extrabold text-emerald-400 tabular-nums font-heading">
                  {ADMIN_STATS.renewalRate}%
                </span>
                <p className="text-xs text-neutral-400 mt-2">Industry avg: 72%</p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Monthly Run Rate
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums font-heading">
                  {ADMIN_STATS.monthlyRevenue}
                </span>
                <p className="text-xs text-neutral-400 mt-2">Transparent ledger preview</p>
              </div>
            </div>

            {/* Dynamic Real-Time Occupancy Chart via Recharts */}
            <OccupancyChart />

            {/* Member Directory & Search */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-heading">
                      Gym Member Directory
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      <Database className="w-3.5 h-3.5" />
                      <span>Firestore Sync: {firestoreMembers.length} Saved</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Eliminate manual spreadsheets with real-time membership validation, Firestore persistence, and search.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={memberSearchQuery}
                      onChange={(e) => setMemberSearchQuery(e.target.value)}
                      placeholder="Search member, ID, plan..."
                      className="pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 w-48 sm:w-64"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={onOpenRegisterModal}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold uppercase tracking-wider text-xs rounded-lg shadow-sm whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Register Member</span>
                  </button>
                </div>
              </div>

              {/* Directory Table */}
              <div className="pt-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 text-xs text-neutral-400 uppercase tracking-wider font-mono">
                      <th className="pb-3 font-semibold">Member ID</th>
                      <th className="pb-3 font-semibold">Name & Phone</th>
                      <th className="pb-3 font-semibold">Membership Plan</th>
                      <th className="pb-3 font-semibold">Join Date</th>
                      <th className="pb-3 font-semibold">Active Status</th>
                      <th className="pb-3 font-semibold text-right">Data Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {filteredMembers.map((member: any) => (
                      <tr key={member.id} className="hover:bg-neutral-800/30 transition-colors">
                        <td className="py-4 font-mono text-xs text-neutral-400">
                          {member.id}
                        </td>
                        <td className="py-4 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <span>{member.name}</span>
                          </div>
                          <span className="text-[11px] text-amber-400/90 font-mono block mt-0.5">
                            {member.phone || member.phoneNumber || '+91 98765 43210'}
                          </span>
                        </td>
                        <td className="py-4 text-xs font-mono text-neutral-200">
                          {member.plan}
                        </td>
                        <td className="py-4 font-mono text-xs text-neutral-300">
                          {member.joinDate || '2026-01-15'}
                        </td>
                        <td className="py-4">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              member.status === 'ACTIVE'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : member.status === 'PENDING'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="py-4 font-mono text-xs text-right">
                          {member.isRealtimeFirestore ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              <Database className="w-3 h-3" />
                              <span>Firestore Cloud</span>
                            </span>
                          ) : (
                            <span className="text-neutral-500 text-[11px]">
                              Baseline Demo
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
