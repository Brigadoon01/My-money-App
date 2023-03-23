import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsLoading(true);
    try {
      //? signup user

      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);
      if (!res) {
        throw new Error("Could not complete signup");
      }
      await res.user.sendEmailVerification();
      //? add display name
      await res.user.updateProfile({
        displayName,
      });
      setIsLoading(false);
      setError(null);
      //?dispatch login action
      dispatch({
        type: "LOGIN",
        payload: res.user,
      });
      //? update state
      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, isLoading, error };
};

export default useSignup;
