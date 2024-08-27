import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";

import app from "./init";

const firestore = getFirestore(app);

export const retrieveData = async (collectionName: string) => {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};

export const retrieveDataById = async (collectionName: string, id: string) => {
  const snapshot = await getDoc(doc(firestore, collectionName, id));

  const data = snapshot.data();

  return data;
};

export const signIn = async (userData: { email: string }) => {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data) {
    return data[0];
  } else {
    return null;
  }
};

export const signUp = async (
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function
) => {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback({ status: false, message: "Email already exists" });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Register success" });
      })
      .catch((error) => {
        callback({ status: false, message: error });
      });
  }
};

export const signInWithGoogle = async (userData: any, callback: any) => {
  try {
    const q = query(
      collection(firestore, "users"),
      where("email", "==", userData.email)
    );
    const snapshot = await getDocs(q);
    const data: any = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      userData.role = data[0].role;
      await updateDoc(doc(firestore, "users", data[0].id), userData);
    } else {
      userData.role = "member";
      await addDoc(collection(firestore, "users"), userData);
    }

    callback({
      status: true,
      message: "Sign In with Google success",
      data: userData,
    });
  } catch (error) {
    callback({
      status: false,
      message: "Sign In with Google failed",
    });
  }
};

