"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [globalUser, setGlobalUser] = useState<any>(null);
  const [globalData, setGlobalData] = useState<{} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function logout() {
    setGlobalUser(null);
    setGlobalData(null);
    router.push("/");
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      //console.log("CURRENT_USER: ", user);
      setGlobalUser(user);

      if (!user) {
        console.log("NO ACTIVE USER");
        return;
      }

      try {
        setIsLoading(true);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let firebaseData = {};

        if (docSnap.exists()) {
          firebaseData = docSnap.data();
          console.log("FOUND USER DATA");
        }
        setGlobalData(firebaseData);
      } catch (error) {
        console.error("an error has occured", (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("global data", globalData);
  }, []);

  const value = {
    globalUser,
    setGlobalUser,
    globalData,
    setGlobalData,
    isLoading,
    setIsLoading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
