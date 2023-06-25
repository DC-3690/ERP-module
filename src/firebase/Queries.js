import {
  collection,
  deleteDoc,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  Firestore,
  query,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase_con";

// Fetching data
export async function fetch_data(collect2, field, value) {
  const collect = collection(db, collect2);

  const records = await getDocs(collect);
  return records.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

//Add document to the collection
export async function add_data(collect2, obj) {
  const collect = collection(db, collect2);

  await addDoc(collect, obj);
  alert("Document added successfully");
}

// delete document from the collection
export async function delete_data(collect2, id) {
  const rec = doc(db, collect2, id);
  alert("Document deleted successfully");
  await deleteDoc(rec);
}

// update document in the collection
export async function update_data(collect2, id, data) {
  const refrence = doc(db, collect2, id);
  await updateDoc(refrence, data);
  alert("document Updated successfully");
}
