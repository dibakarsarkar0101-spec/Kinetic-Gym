import { MembershipPlan, Trainer, WorkoutTrack, ScheduleSlot, GymNotification, MemberData, AdminStats, HourlyOccupancy } from '../types/gym';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    priceMonthly: 999,
    priceAnnual: 799,
    tagline: 'Essential access for disciplined solo lifters.',
    features: [
      'Standard gym floor access (non-peak)',
      'Strength & cardio machine zones',
      'Locker room & shower access',
      'Kinetic mobile member pass',
    ],
    notIncluded: [
      'Personal coach assignment',
      'Priority slot reservations',
      'Sauna & recovery lounge access',
      'Guest passes per month',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    priceMonthly: 1999,
    priceAnnual: 1599,
    popular: true,
    tagline: 'Our flagship membership designed for accelerated transformation.',
    features: [
      'Full 24/7 all-zone gym access',
      'Dedicated strength & Olympic lifting platforms',
      'Personal trainer guidance & quarterly review',
      'Flexible workout slot reservation',
      'Sauna & cold plunge recovery zone',
      '2 complimentary guest passes / month',
      'Kinetic digital pass & workout tracking',
    ],
  },
  {
    id: 'elite',
    name: 'Elite Athlete',
    priceMonthly: 3499,
    priceAnnual: 2799,
    tagline: 'All-inclusive performance coaching with private recovery suites.',
    features: [
      'Everything in Premium, plus unlimited VIP access',
      '2 dedicated 1-on-1 personal coaching sessions / week',
      'Customized biomechanics & strength programming',
      'Unlimited recovery suite & infrared sauna usage',
      'Permanent reserved private locker',
      'Unlimited guest passes (advance booking)',
      'Complimentary pre-workout & post-workout shakes',
    ],
  },
];

export const TRAINERS: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Rahul Sharma',
    role: 'Head Strength & Conditioning Coach',
    specialization: 'Olympic Lifting, Barbell Hypertrophy & Athletic Power',
    bio: 'CSCS certified with 9+ years mentoring competitive lifters and transformation seekers. Focuses on safe lifting biomechanics and sustainable strength progression.',
    rating: 4.95,
    clientCount: 24,
    image: '/src/assets/images/trainer_rahul_sharma_1791061835429.jpg',
    slotsToday: ['07:00 AM', '10:00 AM', '04:00 PM', '06:00 PM'],
  },
  {
    id: 'trainer-2',
    name: 'Priya Patel',
    role: 'Functional Conditioning & Mobility Specialist',
    specialization: 'HIIT, Kettlebell Conditioning & Postural Rehabilitation',
    bio: 'Former national athlete specializing in metabolic conditioning, core endurance, and injury-preventative joint mobility programs.',
    rating: 4.92,
    clientCount: 19,
    image: '/src/assets/images/trainer_priya_patel_1791061846984.jpg',
    slotsToday: ['08:00 AM', '11:30 AM', '05:00 PM', '07:30 PM'],
  },
  {
    id: 'trainer-3',
    name: 'Marcus Vance',
    role: 'Senior Performance Coach',
    specialization: 'Powerlifting, Strength Periodization & Body Recomposition',
    bio: '12 years coaching elite powerlifters and executive professionals with data-driven lifting protocols and progressive overload tracking.',
    rating: 4.98,
    clientCount: 22,
    image: '/src/assets/images/trainer_marcus_vance_1791061858969.jpg',
    slotsToday: ['06:30 AM', '09:00 AM', '03:30 PM', '06:30 PM'],
  },
];

export const WORKOUT_TRACKS: WorkoutTrack[] = [
  {
    id: 'track-1',
    name: 'Hypertrophy & Strength',
    focus: 'Chest, Shoulders & Triceps Density',
    durationMin: 55,
    intensity: 'High',
    exercises: [
      { name: 'Barbell Incline Bench Press', sets: 4, repsOrTime: '8-10 reps', completed: true },
      { name: 'Dumbbell Flat Press', sets: 3, repsOrTime: '10-12 reps', completed: true },
      { name: 'Cable Lateral Flyes', sets: 4, repsOrTime: '15 reps', completed: false },
      { name: 'Overhead Barbell Tricep Extension', sets: 3, repsOrTime: '12 reps', completed: false },
    ],
  },
  {
    id: 'track-2',
    name: 'Athletic Conditioning & Core',
    focus: 'Metabolic Output & VO2 Max',
    durationMin: 45,
    intensity: 'Elite',
    exercises: [
      { name: 'Kettlebell Dual Cleans', sets: 5, repsOrTime: '60s rounds', completed: true },
      { name: 'Assault Bike Sprint Intervals', sets: 6, repsOrTime: '30s on / 30s off', completed: false },
      { name: 'Weighted Sled Pushes (60kg)', sets: 4, repsOrTime: '25 meters', completed: false },
      { name: 'Hanging Leg Raises', sets: 3, repsOrTime: '15 reps', completed: false },
    ],
  },
  {
    id: 'track-3',
    name: 'Mobility & Structural Recovery',
    focus: 'Thoracic Extension & Hip Capsule',
    durationMin: 35,
    intensity: 'Medium',
    exercises: [
      { name: 'World’s Greatest Stretch Flow', sets: 3, repsOrTime: '8 reps / side', completed: true },
      { name: 'Active Pigeon Pose Isometric', sets: 3, repsOrTime: '45s hold', completed: true },
      { name: 'Scapular Wall Slides & Dislocates', sets: 3, repsOrTime: '12 reps', completed: true },
      { name: 'Banded Hamstring Distraction', sets: 2, repsOrTime: '60s hold', completed: false },
    ],
  },
];

export const SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: 'slot-1',
    day: 'Today',
    time: '06:00 PM',
    activity: 'Strength & Hypertrophy Zone',
    trainer: 'Rahul Sharma',
    spotsLeft: 3,
    status: 'Booked',
  },
  {
    id: 'slot-2',
    day: 'Tomorrow',
    time: '07:00 AM',
    activity: 'Metabolic Conditioning Circuit',
    trainer: 'Priya Patel',
    spotsLeft: 5,
    status: 'Available',
  },
  {
    id: 'slot-3',
    day: 'Tomorrow',
    time: '05:30 PM',
    activity: 'Olympic Lifting Technical Clinic',
    trainer: 'Rahul Sharma',
    spotsLeft: 2,
    status: 'Available',
  },
  {
    id: 'slot-4',
    day: 'Thursday',
    time: '06:30 PM',
    activity: 'High-Velocity Kettlebell Burn',
    trainer: 'Marcus Vance',
    spotsLeft: 0,
    status: 'Full',
  },
];

export const MOCK_NOTIFICATIONS: GymNotification[] = [
  {
    id: 'notif-1',
    title: 'Workout Slot Confirmed',
    message: 'Your slot for Strength Zone today at 6:00 PM with Coach Rahul is locked in.',
    timestamp: '2 hours ago',
    type: 'schedule',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Quarterly Body Biometrics Available',
    message: 'Coach Rahul updated your InBody assessment metrics. Review progress in your portal.',
    timestamp: 'Yesterday',
    type: 'membership',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Facility Maintenance Notice',
    message: 'Cold plunge maintenance completed; recovery suites are fully operational.',
    timestamp: '2 days ago',
    type: 'announcement',
    read: true,
  },
];

export const CURRENT_MEMBER_DEMO: MemberData = {
  id: 'KIN-8829-DX',
  name: 'Devin Cole',
  email: 'devin.cole@example.com',
  phone: '+91 98765 43210',
  membershipPlan: 'Premium',
  membershipStatus: 'ACTIVE',
  daysLeft: 28,
  activeDaysThisMonth: 18,
  nextSlotTime: '6:00 PM Today',
  nextSlotActivity: 'Chest & Back Hypertrophy',
  trainerName: 'Rahul Sharma',
  trainerRole: 'Personal Coach',
  joinDate: 'Jan 15, 2026',
  renewalDate: 'Nov 01, 2026',
  preferredTime: 'Evening (05:00 PM - 08:00 PM)',
};

export const ADMIN_STATS: AdminStats = {
  totalMembers: 418,
  activeCheckIns: 42,
  renewalRate: 94.6,
  trainersOnDuty: 8,
  monthlyRevenue: '₹8,35,000',
};

export const ADMIN_MEMBER_DIRECTORY = [
  { id: 'KIN-8829-DX', name: 'Devin Cole', plan: 'Premium', status: 'ACTIVE', trainer: 'Rahul Sharma', daysLeft: 28, attendance: '18 sessions' },
  { id: 'KIN-7712-BA', name: 'Sneha Roy', plan: 'Elite Athlete', status: 'ACTIVE', trainer: 'Priya Patel', daysLeft: 64, attendance: '22 sessions' },
  { id: 'KIN-4301-KL', name: 'Vikram Joshi', plan: 'Basic', status: 'EXPIRED', trainer: 'Unassigned', daysLeft: 0, attendance: '8 sessions' },
  { id: 'KIN-9014-OP', name: 'Aman Singhania', plan: 'Premium', status: 'ACTIVE', trainer: 'Marcus Vance', daysLeft: 14, attendance: '15 sessions' },
  { id: 'KIN-5520-QR', name: 'Meera Rao', plan: 'Premium', status: 'PENDING', trainer: 'Rahul Sharma', daysLeft: 30, attendance: 'New Member' },
];

export const TRAINER_ASSIGNED_CLIENTS = [
  { id: 'KIN-8829-DX', name: 'Devin Cole', goal: 'Upper Body Hypertrophy', streak: '18 Days', nextSession: 'Today 6:00 PM', program: 'Hypertrophy Track Week 4' },
  { id: 'KIN-5520-QR', name: 'Meera Rao', goal: 'Strength Foundation', streak: '6 Days', nextSession: 'Tomorrow 10:00 AM', program: 'Compound Lift Onboarding' },
  { id: 'KIN-3129-MK', name: 'Tanmay Bhatt', goal: 'Powerlifting Total +40kg', streak: '24 Days', nextSession: 'Thursday 4:00 PM', program: 'Peaking Block Deadlift' },
  { id: 'KIN-6804-ZZ', name: 'Rohan Mehra', goal: 'Fat Loss & VO2 Max', streak: '12 Days', nextSession: 'Friday 6:00 PM', program: 'Functional Density Block' },
];

export const HOURLY_OCCUPANCY_TODAY: HourlyOccupancy[] = [
  { hour: '05:00', occupancy: 9, strengthZone: 5, cardioZone: 3, recoveryZone: 1, capacity: 85 },
  { hour: '06:00', occupancy: 24, strengthZone: 14, cardioZone: 8, recoveryZone: 2, capacity: 85 },
  { hour: '07:00', occupancy: 58, strengthZone: 32, cardioZone: 20, recoveryZone: 6, capacity: 85, isPeak: true },
  { hour: '08:00', occupancy: 64, strengthZone: 35, cardioZone: 22, recoveryZone: 7, capacity: 85, isPeak: true },
  { hour: '09:00', occupancy: 46, strengthZone: 26, cardioZone: 14, recoveryZone: 6, capacity: 85 },
  { hour: '10:00', occupancy: 31, strengthZone: 18, cardioZone: 9, recoveryZone: 4, capacity: 85 },
  { hour: '11:00', occupancy: 22, strengthZone: 12, cardioZone: 7, recoveryZone: 3, capacity: 85 },
  { hour: '12:00', occupancy: 29, strengthZone: 16, cardioZone: 10, recoveryZone: 3, capacity: 85 },
  { hour: '13:00', occupancy: 18, strengthZone: 10, cardioZone: 6, recoveryZone: 2, capacity: 85 },
  { hour: '14:00', occupancy: 16, strengthZone: 9, cardioZone: 5, recoveryZone: 2, capacity: 85 },
  { hour: '15:00', occupancy: 23, strengthZone: 13, cardioZone: 7, recoveryZone: 3, capacity: 85 },
  { hour: '16:00', occupancy: 38, strengthZone: 21, cardioZone: 12, recoveryZone: 5, capacity: 85 },
  { hour: '17:00', occupancy: 62, strengthZone: 34, cardioZone: 21, recoveryZone: 7, capacity: 85, isPeak: true },
  { hour: '18:00', occupancy: 74, strengthZone: 41, cardioZone: 24, recoveryZone: 9, capacity: 85, isPeak: true, isCurrent: true },
  { hour: '19:00', occupancy: 71, strengthZone: 39, cardioZone: 23, recoveryZone: 9, capacity: 85, isPeak: true },
  { hour: '20:00', occupancy: 53, strengthZone: 29, cardioZone: 18, recoveryZone: 6, capacity: 85 },
  { hour: '21:00', occupancy: 36, strengthZone: 20, cardioZone: 12, recoveryZone: 4, capacity: 85 },
  { hour: '22:00', occupancy: 19, strengthZone: 11, cardioZone: 6, recoveryZone: 2, capacity: 85 },
  { hour: '23:00', occupancy: 7, strengthZone: 4, cardioZone: 2, recoveryZone: 1, capacity: 85 },
];

export const HOURLY_OCCUPANCY_YESTERDAY: HourlyOccupancy[] = [
  { hour: '05:00', occupancy: 7, strengthZone: 4, cardioZone: 2, recoveryZone: 1, capacity: 85 },
  { hour: '06:00', occupancy: 21, strengthZone: 12, cardioZone: 7, recoveryZone: 2, capacity: 85 },
  { hour: '07:00', occupancy: 52, strengthZone: 29, cardioZone: 18, recoveryZone: 5, capacity: 85, isPeak: true },
  { hour: '08:00', occupancy: 61, strengthZone: 33, cardioZone: 21, recoveryZone: 7, capacity: 85, isPeak: true },
  { hour: '09:00', occupancy: 42, strengthZone: 24, cardioZone: 13, recoveryZone: 5, capacity: 85 },
  { hour: '10:00', occupancy: 28, strengthZone: 16, cardioZone: 9, recoveryZone: 3, capacity: 85 },
  { hour: '11:00', occupancy: 20, strengthZone: 11, cardioZone: 6, recoveryZone: 3, capacity: 85 },
  { hour: '12:00', occupancy: 26, strengthZone: 15, cardioZone: 8, recoveryZone: 3, capacity: 85 },
  { hour: '13:00', occupancy: 15, strengthZone: 8, cardioZone: 5, recoveryZone: 2, capacity: 85 },
  { hour: '14:00', occupancy: 14, strengthZone: 8, cardioZone: 4, recoveryZone: 2, capacity: 85 },
  { hour: '15:00', occupancy: 20, strengthZone: 11, cardioZone: 6, recoveryZone: 3, capacity: 85 },
  { hour: '16:00', occupancy: 34, strengthZone: 19, cardioZone: 11, recoveryZone: 4, capacity: 85 },
  { hour: '17:00', occupancy: 59, strengthZone: 33, cardioZone: 20, recoveryZone: 6, capacity: 85, isPeak: true },
  { hour: '18:00', occupancy: 70, strengthZone: 39, cardioZone: 23, recoveryZone: 8, capacity: 85, isPeak: true },
  { hour: '19:00', occupancy: 68, strengthZone: 37, cardioZone: 22, recoveryZone: 9, capacity: 85, isPeak: true },
  { hour: '20:00', occupancy: 49, strengthZone: 27, cardioZone: 17, recoveryZone: 5, capacity: 85 },
  { hour: '21:00', occupancy: 32, strengthZone: 18, cardioZone: 11, recoveryZone: 3, capacity: 85 },
  { hour: '22:00', occupancy: 17, strengthZone: 10, cardioZone: 5, recoveryZone: 2, capacity: 85 },
  { hour: '23:00', occupancy: 6, strengthZone: 3, cardioZone: 2, recoveryZone: 1, capacity: 85 },
];

export const HOURLY_OCCUPANCY_WEEKEND: HourlyOccupancy[] = [
  { hour: '07:00', occupancy: 18, strengthZone: 10, cardioZone: 6, recoveryZone: 2, capacity: 85 },
  { hour: '08:00', occupancy: 38, strengthZone: 21, cardioZone: 13, recoveryZone: 4, capacity: 85 },
  { hour: '09:00', occupancy: 56, strengthZone: 31, cardioZone: 19, recoveryZone: 6, capacity: 85, isPeak: true },
  { hour: '10:00', occupancy: 65, strengthZone: 36, cardioZone: 21, recoveryZone: 8, capacity: 85, isPeak: true },
  { hour: '11:00', occupancy: 60, strengthZone: 33, cardioZone: 20, recoveryZone: 7, capacity: 85, isPeak: true },
  { hour: '12:00', occupancy: 44, strengthZone: 24, cardioZone: 15, recoveryZone: 5, capacity: 85 },
  { hour: '13:00', occupancy: 32, strengthZone: 18, cardioZone: 10, recoveryZone: 4, capacity: 85 },
  { hour: '14:00', occupancy: 26, strengthZone: 14, cardioZone: 9, recoveryZone: 3, capacity: 85 },
  { hour: '15:00', occupancy: 30, strengthZone: 17, cardioZone: 10, recoveryZone: 3, capacity: 85 },
  { hour: '16:00', occupancy: 42, strengthZone: 23, cardioZone: 14, recoveryZone: 5, capacity: 85 },
  { hour: '17:00', occupancy: 48, strengthZone: 27, cardioZone: 16, recoveryZone: 5, capacity: 85 },
  { hour: '18:00', occupancy: 42, strengthZone: 23, cardioZone: 14, recoveryZone: 5, capacity: 85 },
  { hour: '19:00', occupancy: 30, strengthZone: 17, cardioZone: 10, recoveryZone: 3, capacity: 85 },
  { hour: '20:00', occupancy: 16, strengthZone: 9, cardioZone: 5, recoveryZone: 2, capacity: 85 },
];
