
import * as firebaseApp from "firebase/app";
import * as firestore from "firebase/firestore";
import * as fireAuth from "firebase/auth";

// Fix: Utilized namespaced imports to ensure compatibility and resolve "no exported member" errors during build
const { initializeApp } = firebaseApp;
const { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  setDoc,
  deleteDoc, 
  query, 
  serverTimestamp,
  orderBy,
  Timestamp,
  where,
  limit
} = firestore;
const { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged,
  signOut: firebaseSignOut
} = fireAuth;

const firebaseConfig = {
  apiKey: "AIzaSyCr3ghH0NpRzsFPoCalVFauVeTcSMSymaY",
  authDomain: "assisthunt12.firebaseapp.com",
  projectId: "assisthunt12",
  storageBucket: "assisthunt12.firebasestorage.app",
  messagingSenderId: "528697531134",
  appId: "1:528697531134:web:a2e3018b4ed259e165e3af",
  measurementId: "G-C9E0KTNGKG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: serverTimestamp()
    }, { merge: true });

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const signOut = () => firebaseSignOut(auth);

export const getCurrentUser = (): Promise<fireAuth.User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export const saveAgent = async (agentId: string, agentData: any) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Must be logged in to save agents");

    // 1. Private User Record
    const agentRef = doc(db, "users", user.uid, "agents", agentId);
    
    // 2. Public Lookup Record (Avoids CollectionGroup Index issues)
    const publicAgentRef = doc(db, "public_agents", agentId);
    
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);

    const payload = {
      ...agentData,
      id: agentId,
      userId: user.uid,
      updatedAt: serverTimestamp(),
      expiryDate: agentData.expiryDate || Timestamp.fromDate(expiry),
      status: agentData.status || 'Active',
      messagesCount: agentData.messagesCount || 0,
      url: agentData.url || `${window.location.origin}/embed/${agentId}`
    };

    if (!agentData.createdAt) {
      payload.createdAt = serverTimestamp();
    }

    // Save to both locations
    await setDoc(agentRef, payload, { merge: true });
    await setDoc(publicAgentRef, payload, { merge: true });

    // Handle Knowledge Base
    const crawledUrls = agentData.agentConfig?.crawledUrls || [];
    if (crawledUrls.length > 0) {
      const knowledgeRef = doc(db, "users", user.uid, "agents", agentId, "khowladge", "metadata");
      await setDoc(knowledgeRef, {
        urls: crawledUrls,
        totalUrls: crawledUrls.length,
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    return payload;
  } catch (e) {
    console.error("Error saving agent: ", e);
    throw e;
  }
};

/**
 * Fetches an agent by ID directly from the public_agents collection.
 * No collectionGroup query means NO INDEX required.
 */
export const fetchPublicAgent = async (agentId: string) => {
  try {
    const publicAgentRef = doc(db, "public_agents", agentId);
    const docSnap = await getDoc(publicAgentRef);
    
    if (docSnap.exists()) {
      // Fix: Added explicit cast to any to resolve spread types error from DocumentData
      return { id: docSnap.id, ...(docSnap.data() as any) };
    }
    
    return null;
  } catch (e: any) {
    console.error("Firestore fetchPublicAgent Error:", e);
    throw new Error(e.message || "Failed to query database");
  }
};

export const fetchAgents = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const agentsRef = collection(db, "users", user.uid, "agents");
    const q = query(agentsRef, orderBy("updatedAt", "desc"));
      
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(docSnap => {
      // Fix: Cast docSnap.data() to any to fix spread types and unknown property access errors on DocumentData
      const d = docSnap.data() as any;
      return {
        id: docSnap.id,
        ...d,
        createdDate: d.createdAt ? d.createdAt.toDate().toLocaleDateString() : 'Just now',
        expiryDate: d.expiryDate ? d.expiryDate.toDate().toLocaleDateString() : 'N/A',
      };
    });

    return data;
  } catch (e) {
    console.error("Error fetching agents: ", e);
    return [];
  }
};

export const removeAgent = async (agentId: string) => {
  const user = auth.currentUser;
  if (!user) return;
  
  // Remove from both locations
  await deleteDoc(doc(db, "users", user.uid, "agents", agentId));
  await deleteDoc(doc(db, "public_agents", agentId));
};
