import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

// this one is saving a new items
export const saveItem = async (data) => {
    await setDoc (doc(firestore, "computerItems", `${Date.now()}`), data, {
        merge: true

  });
};

// getall the computer items
export const getAllComputerItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "computerItems"), orderBy("id", "desc"))
  );
    return items.doc.map((doc) => doc.data());
};
