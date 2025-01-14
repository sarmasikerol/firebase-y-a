// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";
import store from "./store";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCntQ8xD03nfOUt1ZysTAjQXyPE8YrO_pg",
  authDomain: "yt-auth-ac905.firebaseapp.com",
  projectId: "yt-auth-ac905",
  storageBucket: "yt-auth-ac905.firebasestorage.app",
  messagingSenderId: "980393513112",
  appId: "1:980393513112:web:eaac95d396d93e948780ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const resetPassword = async (password) => {
    try {
      await updatePassword(auth.currentUser, password);
      toast.success("Şifre güncellendi");
      return true;
    } catch (error) {
      toast.error(error.message);
    }
  };

export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast("Doğrulama maili gönderildi");
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified, 
        photoURL: user.photoURL,
        uid: user.uid,
      })
    );
  } else {
    store.dispatch(logoutHandle());
  }
});

export default app;
