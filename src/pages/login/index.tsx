import { useUser } from "@/contexts/UserContext";
import { signInWithGoogle } from "@/firebase/auth";
import { useUserSession } from "@/hooks/use-user-session";
import React, { useEffect } from "react";

const LoginPage = () => {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <p>Current user: {user?.email}</p>
      <button onClick={signInWithGoogle}>Login</button>
    </div>
  );
};

export default LoginPage;
