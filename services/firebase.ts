import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User,
  Auth,
} from 'firebase/auth';
// @ts-expect-error - getReactNativePersistence is exported in React Native bundle
import { getReactNativePersistence } from '@firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  FirebaseStorage,
} from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (only if not already initialized)
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with AsyncStorage persistence
let firebaseAuth: Auth;
try {
  firebaseAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch {
  // Auth already initialized, get existing instance
  firebaseAuth = getAuth(app);
}

export { firebaseAuth };

// Firestore and Storage
export const db: Firestore = getFirestore(app);
export const firebaseStorage: FirebaseStorage = getStorage(app);

// Type exports
export type { User };

// Auth helpers
export const getCurrentUser = () => firebaseAuth.currentUser;

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(firebaseAuth, email, password);

export const signUpWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(firebaseAuth, email, password);

export const signOut = () => firebaseSignOut(firebaseAuth);

export const onAuthStateChanged = (callback: (user: User | null) => void) =>
  firebaseOnAuthStateChanged(firebaseAuth, callback);

// Firestore helpers
export const getCollection = (collectionPath: string) => collection(db, collectionPath);

export const getDocument = (collectionPath: string, docId: string) =>
  doc(db, collectionPath, docId);

// Storage helpers
export const getStorageRef = (path: string) => ref(firebaseStorage, path);

// User Profile types
export interface UserProfile {
  displayName: string;
  bio: string;
  age: number;
  avatURL: string;
  timezone: string;
  platforms: string[];
  playTimes: string[];
  preferredGames: string[];
  tags: string[];
}

export interface UserDocument {
  email: string;
  groupIds: string[];
  lastActiveAt: Date;
  profile: UserProfile;
  updatedAt: Date;
}

// User Profile helpers
export const getUserProfile = async (uid: string): Promise<UserDocument | null> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserDocument;
  }
  return null;
};

export const updateUserProfile = async (
  uid: string,
  profile: Partial<UserProfile>
): Promise<void> => {
  const docRef = doc(db, 'users', uid);
  await setDoc(docRef, {
    profile,
    updatedAt: serverTimestamp(),
  }, { merge: true });
};
