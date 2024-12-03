import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, collectionName);
    let q = query(collectionRef, orderBy("createdAt"));

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      q = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy("createdAt")
      );
    }

    const unsubscribed = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(docs);
    });

    return unsubscribed;
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;
