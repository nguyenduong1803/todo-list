import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  deleteDoc,
  where,
  query,
  doc,
  setDoc,
} from "firebase/firestore";
import { errorMessage, successMessage } from "./toastMessage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const dbName = process.env.REACT_APP_DB_NAME;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const refTodos = collection(db, dbName);

// GET
export const getData = async () => {
  const querySnapshot = await getDocs(refTodos);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

// ADD
export const addTodo = async (todo) => {
  try {
    await addDoc(refTodos, todo);
    successMessage("Add success");
  } catch (error) {
    errorMessage(error);
  }
};
// DELETE
export const deleteTodo = async (todoId) => {
  const docRef = doc(db, dbName, todoId);
  deleteDoc(docRef)
    .then(() => {
      successMessage("Delete success");
    })
    .catch((error) => {
      errorMessage(error);
    });
};

// UPDATE
export const updateTodo = async (todoId, newTodo) => {
  try {
    await setDoc(doc(db, dbName, todoId), newTodo);
    successMessage("Update success");
  } catch (error) {
    errorMessage(error);
  }
};

// FILTER
export const filterTodo = async (searchKey = "") => {
  console.log(searchKey);
  const q = query(refTodos, where("todoName", "array-contains", searchKey));
  const data = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export default db;
