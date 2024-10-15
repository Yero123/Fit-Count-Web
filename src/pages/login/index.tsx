import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { signInWithGoogle } from "@/firebase/auth";
import { useUserSession } from "@/hooks/use-user-session";
import React, { useEffect } from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-center h-screen items-center flex-col gap-4">
      <h1>Login Page</h1>
      <Button
        onClick={async () => {
          const result = await signInWithGoogle();
          // save in local storage the result
          localStorage.setItem("userId", result as string);
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
