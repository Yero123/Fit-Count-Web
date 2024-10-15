// context/UserContext.js
import { auth } from "@/firebase/config";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect, use } from "react";

// Crear el contexto
const UserContext = createContext<{
  user: User | null;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

// Hook para usar el contexto
export const useUser = () => useContext(UserContext);

// Componente proveedor del contexto
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    // Listener para el estado de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Si el usuario está autenticado, lo guarda en el estado
      setLoading(false); // Cambia el estado de carga
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);
  console.log(user);
  useEffect(() => {
    if (user && router.pathname === "/login") {
      router.push("/dashboard");
    }
    if (
      !user &&
      router.pathname !== "/login" &&
      router.pathname !== "/signup" &&
      router.pathname !== "/"
    ) {
      router.push("/login");
    }

    if(user && localStorage.getItem("userId") !== user.uid) {
      localStorage.setItem("userId", user.uid);
    }
  }, [router, user]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
