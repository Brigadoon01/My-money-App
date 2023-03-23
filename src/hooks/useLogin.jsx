import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);
    //? log user  in
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password)
      //? dispatch logout action
      dispatch({ type: "LOGIN", payload: res.user });
      //? update state
      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
      setIsLoading(false);
      setError(null);
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message); 
        setError(err.message);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { login, error, isLoading };
};
