export type RoleType = 'member' | 'trainer' | 'admin';

export interface MembershipPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  tagline: string;
  features: string[];
  notIncluded?: string[];
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialization: string;
  bio: string;
  rating: number;
  clientCount: number;
  image: string;
  slotsToday: string[];
}

export interface WorkoutTrack {
  id: string;
  name: string;
  focus: string;
  durationMin: number;
  intensity: 'Medium' | 'High' | 'Elite';
  exercises: {
    name: string;
    sets: number;
    repsOrTime: string;
    completed?: boolean;
  }[];
}

export interface ScheduleSlot {
  id: string;
  day: string;
  time: string;
  activity: string;
  trainer: string;
  spotsLeft: number;
  status: 'Available' | 'Booked' | 'Full';
}

export interface GymNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'membership' | 'schedule' | 'announcement';
  read: boolean;
}

export interface MemberData {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipPlan: string;
  membershipStatus: 'ACTIVE' | 'PENDING' | 'EXPIRED';
  daysLeft: number;
  activeDaysThisMonth: number;
  nextSlotTime: string;
  nextSlotActivity: string;
  trainerName: string;
  trainerRole: string;
  joinDate: string;
  renewalDate: string;
  preferredTime: string;
}

export interface AdminStats {
  totalMembers: number;
  activeCheckIns: number;
  renewalRate: number;
  trainersOnDuty: number;
  monthlyRevenue: string;
}

export interface HourlyOccupancy {
  hour: string;
  occupancy: number;
  strengthZone: number;
  cardioZone: number;
  recoveryZone: number;
  capacity: number;
  isPeak?: boolean;
  isCurrent?: boolean;
}
