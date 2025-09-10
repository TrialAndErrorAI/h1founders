
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUS4zTUJZWbIm0cAnMZJUKPHoIzU_ZOT8",
  authDomain: "h1founders.firebaseapp.com",
  projectId: "h1founders",
  storageBucket: "h1founders.firebasestorage.app",
  messagingSenderId: "102718328",
  appId: "1:102718328:web:36a4b44c4fe78abc5ed7bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateSidProfile() {
  try {
    const userRef = doc(db, "members", "QViviOX79DXnrE9pViXAfcGqTcx2");
    await updateDoc(userRef, {
      username: "sid",
      matrixLevel: "THE_ARCHITECT"
    });
    console.log("✅ Sid updated to @sid and THE_ARCHITECT");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

updateSidProfile();

