import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';

/**
 * ============================================================================
 * BEGINNER GUIDE: FIREBASE FIRESTORE DATA STORAGE
 * ============================================================================
 * 
 * 1. What is Firestore?
 *    Firestore is a cloud database. It acts as our website's persistent "memory".
 *    When a member registers, their information is sent to Firestore and stored
 *    safely online. Even if the user refreshes the page or reopens the browser,
 *    the data is still there!
 * 
 * 2. What is a Collection?
 *    A collection is like a folder or list. We store all our gym members
 *    inside the "members" collection.
 * 
 * 3. What is a Document?
 *    Each member gets their own document inside the "members" collection,
 *    identified by a unique ID (e.g. KIN-2026-XXXX).
 */

export interface FirestoreMember {
  id: string;
  name: string;             // Member's full name
  phone: string;            // Contact phone number
  phoneNumber?: string;     // Alias for phone number
  email: string;            // Email address
  membershipPlan: string;   // Chosen plan: Basic, Premium, or Elite Athlete
  preferredTime: string;    // Preferred workout hours
  joinDate: string;         // Date member registered (YYYY-MM-DD)
  activeStatus: 'ACTIVE' | 'PENDING' | 'EXPIRED'; // Active status
  createdAt?: any;
}

export interface FirestoreTrainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
}

export interface FirestorePlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  benefits: string;
}

export interface FirestoreAnnouncement {
  id: string;
  title: string;
  message: string;
  date: string;
  activeStatus: boolean;
}

// Collection name in Firestore database
const MEMBERS_COLLECTION = 'members';
const TRAINERS_COLLECTION = 'trainers';
const PLANS_COLLECTION = 'plans';
const ANNOUNCEMENTS_COLLECTION = 'announcements';

// Local storage key for persistent offline fallback
const LOCAL_STORAGE_MEMBERS_KEY = 'kinetic_gym_members_list';

/**
 * Helper to get locally cached members.
 * This guarantees member records exist immediately on page refresh,
 * even when operating in Firestore offline mode.
 */
export function getLocalCachedMembers(): FirestoreMember[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_MEMBERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Helper to save members to local storage backup.
 */
export function saveLocalCachedMembers(members: FirestoreMember[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_MEMBERS_KEY, JSON.stringify(members));
  } catch (e) {
    // ignore
  }
}

/**
 * Add a new member to local storage backup.
 */
export function addMemberToLocalCache(member: FirestoreMember): void {
  try {
    const current = getLocalCachedMembers();
    const updated = [member, ...current.filter((m) => m.id !== member.id)];
    saveLocalCachedMembers(updated);
  } catch (e) {
    // ignore
  }
}

/**
 * Save new member registration into Firestore
 * 
 * This function takes the member data from the form and saves it to Firestore.
 * Required fields stored:
 * - name
 * - phone number
 * - membership plan
 * - join date
 * - active status
 */
export async function saveMemberToFirestore(member: FirestoreMember): Promise<void> {
  const memberDocPath = `${MEMBERS_COLLECTION}/${member.id}`;

  // 1. Immediately backup to local storage so page refresh retains this data
  addMemberToLocalCache(member);

  try {
    // 2. Point to the specific document inside the 'members' collection
    const memberRef = doc(db, MEMBERS_COLLECTION, member.id);

    // 3. Write the member fields to Firestore with non-blocking timeout
    const writePromise = setDoc(memberRef, {
      id: member.id,
      name: member.name,
      phone: member.phone,
      phoneNumber: member.phone, // Store phone number for workshop requirements
      membershipPlan: member.membershipPlan,
      joinDate: member.joinDate,
      activeStatus: member.activeStatus,
      email: member.email,
      preferredTime: member.preferredTime,
      createdAt: serverTimestamp(),
    });

    // Race write promise against 2.5s timeout so UI response remains snappy even when offline
    await Promise.race([
      writePromise,
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]);
  } catch (error) {
    // If client is in offline mode or network is delayed, Firestore queues the write locally.
    console.debug('Firestore offline queue notice:', error);
    if (error instanceof Error && !error.message.includes('unavailable') && !error.message.includes('offline')) {
      handleFirestoreError(error, OperationType.WRITE, memberDocPath);
    }
  }
}

/**
 * Real-time listener for members list
 * 
 * Automatically receives updates from Firestore whenever a new member is added.
 * This keeps the Admin Member Directory updated in real time!
 */
export function subscribeToMembers(
  onUpdate: (members: FirestoreMember[]) => void,
  onError?: (err: Error) => void
): () => void {
  // First, immediately load any cached members from local storage
  const cachedMembers = getLocalCachedMembers();
  if (cachedMembers.length > 0) {
    onUpdate(cachedMembers);
  }

  try {
    const membersRef = collection(db, MEMBERS_COLLECTION);
    const q = query(membersRef);

    return onSnapshot(
      q,
      (snapshot) => {
        const members: FirestoreMember[] = [];
        snapshot.forEach((docSnap) => {
          members.push({ id: docSnap.id, ...docSnap.data() } as FirestoreMember);
        });
        if (members.length > 0) {
          saveLocalCachedMembers(members);
          onUpdate(members);
        }
      },
      (error) => {
        // Normal when Firestore operates in offline mode
        console.debug('Firestore operating in offline mode for members list:', error.message);
        if (onError) onError(error);
      }
    );
  } catch (e) {
    return () => {};
  }
}

/**
 * Fetch initial members once
 */
export async function getMembersFromFirestore(): Promise<FirestoreMember[]> {
  try {
    const snapshot = await getDocs(collection(db, MEMBERS_COLLECTION));
    const members: FirestoreMember[] = [];
    snapshot.forEach((docSnap) => {
      members.push({ id: docSnap.id, ...docSnap.data() } as FirestoreMember);
    });
    if (members.length > 0) {
      saveLocalCachedMembers(members);
    }
    return members.length > 0 ? members : getLocalCachedMembers();
  } catch (error) {
    console.debug('Loading members from local offline cache due to connection state');
    return getLocalCachedMembers();
  }
}

/**
 * Real-time listener for Announcements
 */
export function subscribeToAnnouncements(
  onUpdate: (announcements: FirestoreAnnouncement[]) => void
): () => void {
  try {
    const announcementsRef = collection(db, ANNOUNCEMENTS_COLLECTION);
    return onSnapshot(
      announcementsRef,
      (snapshot) => {
        const announcements: FirestoreAnnouncement[] = [];
        snapshot.forEach((docSnap) => {
          announcements.push({ id: docSnap.id, ...docSnap.data() } as FirestoreAnnouncement);
        });
        onUpdate(announcements);
      },
      (error) => {
        console.debug('Announcements note (operating offline):', error.message);
      }
    );
  } catch (e) {
    return () => {};
  }
}

/**
 * Seed initial mock trainers, plans, and announcements into Firestore if empty
 */
export async function seedInitialFirestoreData(): Promise<void> {
  try {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return;
    }
    const trainerPromise = getDocs(collection(db, TRAINERS_COLLECTION));
    const trainerSnap = await Promise.race([
      trainerPromise,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000)),
    ]);
    if (trainerSnap && 'empty' in trainerSnap && trainerSnap.empty) {
      const initialTrainers: FirestoreTrainer[] = [
        {
          id: 'trainer-rahul',
          name: 'Rahul Sharma',
          specialty: 'Olympic Lifting, Barbell Hypertrophy & Athletic Power',
          experience: '9+ years CSCS Certified Coach',
          availability: 'Mon - Fri (07:00 AM - 07:00 PM)',
        },
        {
          id: 'trainer-priya',
          name: 'Priya Patel',
          specialty: 'Functional Conditioning & Mobility Specialist',
          experience: '7 years National Level Coach',
          availability: 'Mon - Sat (08:00 AM - 08:00 PM)',
        },
        {
          id: 'trainer-marcus',
          name: 'Marcus Vance',
          specialty: 'Powerlifting, Strength Periodization & Body Recomp',
          experience: '12 years Elite Powerlifting Coach',
          availability: 'Tue - Sun (06:30 AM - 06:30 PM)',
        },
      ];

      for (const t of initialTrainers) {
        await setDoc(doc(db, TRAINERS_COLLECTION, t.id), t);
      }
    }
  } catch (err) {
    // Normal in offline/restricted sandbox mode; app uses rich mock data
  }
}
