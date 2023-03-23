import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isLoading: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isLoading: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        isLoading: false,
        document: action.payload,
        success: true,
        error: null,
      };
      case "DELETED_DOCUMENT":
        return {
          isLoading: false,
          document: action.payload,
          success: true,
          error: null,
        };
    case "ERROR":
      return {
        isLoading: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //? collection ref
  const ref = projectFirestore.collection(collection);

  //? only dispatch is not canceled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //? add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({...doc, createdAt});
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };
  
  //? delete a document
  const deleteDocument = async (id) => {
    dispatch({type: "IS_PENDING"})

    try {
      const deleteDocuments = await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT", payload: deleteDocuments })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "Could not Delete" })
    }
  };
  const time = () => ref.timestamp.fromDate(new Date().getFullYear())
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { addDocument, deleteDocument, response, time };
};
