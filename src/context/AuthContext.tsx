import { createContext, useState, useContext, ReactNode } from "react";

// Definir la estructura de los datos del usuario
interface User {
  username: string;
}

// Definir la estructura del contexto de autenticación
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

// Crear el contexto con valores por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Función de inicio de sesión
  const login = (username: string, password: string) => {
    // Datos de prueba
    const mockUser = {
      username: "usuarioPrueba",
      password: "contraseñaPrueba",
    };

    if (username === mockUser.username && password === mockUser.password) {
      setUser({ username });
    } else {
      alert("Credenciales incorrectas");
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
