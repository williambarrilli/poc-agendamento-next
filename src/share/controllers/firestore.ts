import {
  getDocs,
  query,
  updateDoc,
  where,
  collection,
  doc,
  getDoc,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { Reserved } from "../types/reserved";
import { EnumStatus } from "../types/enums";

import { Shop } from "../types/shop";
import { firebase } from "@/init-firebase";
import { createCalendar } from "./googleCalendar";

const { db } = firebase();

// TODO REFATORAR CHAMADAS
const getCollection = (nameCollection: string) => {
  return collection(db, nameCollection);
};

const shopsRef = getCollection("shops");

export const addNewShop = async () => {
  try {
    const newShop: Shop = {
      name: "Herick Giaretta",
      email: "herickgiaretta@outlook.com",
      url: "herick",
      phone: "5554 9130-1887",
      instagram: "herickgiaretta",
      reservedList: [],
      solicitationList: [],
      hoursShopOpen: [],
      calendarId: "",
      services: [],
    };
    // adicionar token para criar novo usuario
    const response = await createCalendar("");

    if (!(await getShopByUrl("herick")) && response.id) {
      const docRef = await addDoc(shopsRef, newShop);
      newShop.calendarId = response?.id;
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getShopsList = async () => {
  const retorno: any[] = [];
  const q = query(shopsRef, orderBy("name", "asc"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    retorno.push(doc.data());
  });

  return { data: retorno as Shop[] };
};

export const getShopByEmail = async (email: string) => {
  const searchQuery = query(shopsRef, where("email", "==", email));

  const querySnapshot = await getDocs(searchQuery);
  let retorno;

  querySnapshot.forEach((doc) => {
    if (doc.data()) retorno = { ...doc.data(), id: doc.id };
  });
  return retorno;
};

export const getShopByUrl = async (url: string) => {
  const searchQuery = query(shopsRef, where("url", "==", url));

  const querySnapshot = await getDocs(searchQuery);
  const shop = querySnapshot.docs.find((doc) => doc.data().name);

  if (shop) {
    const retorno = { ...shop.data(), id: shop.id };
    return retorno as Shop;
  } else {
    return undefined;
  }
};

export const sendReserved = async (
  shopId: string,
  reserved: Reserved,
  type: "solicitacion" | "reserved"
) => {
  try {
    const documentRef = doc(db, "shops", shopId);
    const docSnapshot = await getDoc(documentRef);
    if (docSnapshot.exists()) {
      const documentData = docSnapshot.data();
      if (type === "solicitacion") {
        documentData.solicitationList.push(reserved);
        await updateDoc(documentRef, {
          solicitationList: documentData?.solicitationList,
        });
      } else {
        documentData.reservedList.push(reserved);
        await updateDoc(documentRef, {
          reservedList: documentData?.reservedList,
        });
      }
    } else {
      console.log("Document not found");
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
};

export const updateSolicitationReserved = async (
  shopId: string,
  reserved: Reserved,
  index: number
) => {
  try {
    const documentRef = doc(db, "shops", shopId);
    const docSnapshot = await getDoc(documentRef);
    if (docSnapshot.exists()) {
      const documentData = docSnapshot.data() as Shop;

      if (reserved.status === EnumStatus.APROVED) {
        documentData?.reservedList.push(reserved);
      }
      documentData.solicitationList.splice(index, 1);

      await updateDoc(documentRef, {
        solicitationList: documentData.solicitationList,
        reservedList: documentData.reservedList,
      });
    } else {
      console.log("Document not found");
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
};

export const updateHourShop = async (
  shopId: string,
  hoursShopOpen: string[]
) => {
  try {
    const documentRef = doc(db, "shops", shopId);
    const docSnapshot = await getDoc(documentRef);
    if (docSnapshot.exists()) {
      const documentData = docSnapshot.data();

      await updateDoc(documentRef, {
        ...documentData,
        hoursShopOpen,
        // services: [
        //   { name: "Sombra celia", time: 30 },
        //   { name: "cabelo", time: 60 },
        // ],
      });
    } else {
      console.log("Document not found");
    }
  } catch (error) {
    console.log("Error setHourShop document:", error);
  }
};
