// context/UserContext.js
import { auth } from "@/firebase/config";
import { User } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    // Listener para el estado de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Si el usuario está autenticado, lo guarda en el estado
      setLoading(false); // Cambia el estado de carga
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
