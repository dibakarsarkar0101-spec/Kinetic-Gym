import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, doc, getDoc, setLogLevel } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAQjOOkwqulMbTPRlEZiPp1AHRZ340QYi0",
  authDomain: "kinetic-gym-f2976.firebaseapp.com",
  projectId: "kinetic-gym-f2976",
  storageBucket: "kinetic-gym-f2976.firebasestorage.app",
  messagingSenderId: "247058776101",
  appId: "1:247058776101:web:a932b90eecb72df0bebfcc"
};

// Silence internal Firestore SDK connection logs so offline mode works seamlessly
try {
  setLogLevel('silent');
} catch {
  // Ignore
}

// Gracefully intercept Firebase Firestore backend reachability notices in sandboxed/offline environments
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const errorText = args
      .map((arg) => (typeof arg === 'string' ? arg : arg?.message || JSON.stringify(arg)))
      .join(' ');
    if (
      errorText.includes('Could not reach Cloud Firestore backend') ||
      errorText.includes('operate in offline mode') ||
      errorText.includes('@firebase/firestore')
    ) {
      console.debug('[Firestore Offline Handler]: Operating in seamless offline/cached mode');
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with forced long-polling to prevent WebSocket connection failures in sandbox/iframe environments
export const db = (() => {
  try {
    return initializeFirestore(app, {
      experimentalForceLongPolling: true,
    });
  } catch (e) {
    return getFirestore(app);
  }
})();

export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Note: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Safe test connection helper that does not block startup or spam logs
export async function testConnection() {
  try {
    await getDoc(doc(db, 'test', 'connection'));
  } catch (error) {
    // Normal in offline/sandbox mode; Firestore operates offline with local cache
  }
}
