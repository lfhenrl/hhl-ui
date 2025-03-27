import { type FirebaseApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  Firestore,
  DocumentReference,
  type DocumentData,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDVLgsLMzFU58GDPXgsS_wiQGOtzOV5K3k",
  authDomain: "style-guide-657d4.firebaseapp.com",
  projectId: "style-guide-657d4",
  storageBucket: "style-guide-657d4.appspot.com",
  messagingSenderId: "558687596971",
  appId: "1:558687596971:web:72ec63af8f3bb1eaa322ee",
};

let isLoadet = false;
let app: FirebaseApp;
let db: Firestore;
let ganttData: DocumentReference<DocumentData>;

function loadFirebase() {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  ganttData = doc(db, "ganttData/1");
  isLoadet = true;
}

export async function getGanttData() {
  if (!isLoadet) {
    loadFirebase();
  }
  const dataSnapShot = await getDoc(ganttData);
  return await dataSnapShot.data();
}

export async function saveGanttData(data: any) {
  if (!isLoadet) {
    loadFirebase();
  }
  return setDoc(ganttData, data)
    .then(() => hhl.alert("info", "Data Saved", ""))
    .catch((reason: any) => hhl.alert("err", "Something went wrong!", reason))
    .finally(() => true);
}
