import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcSZI8tfo8bd5akEEMT0R2I1s5NPMe3oM",
  authDomain: "grid-hub-lfs.firebaseapp.com",
  projectId: "grid-hub-lfs",
  storageBucket: "grid-hub-lfs.firebasestorage.app",
  messagingSenderId: "891563045847",
  appId: "1:891563045847:web:c0c7cad652de20b088d192",
  measurementId: "G-3KTWLMV7BJ"
};

const app = initializeApp(firebaseConfig);

getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
