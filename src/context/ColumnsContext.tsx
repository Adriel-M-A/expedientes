import { createContext, useContext, useState, ReactNode } from "react";

// Definición de la interfaz que indica la visibilidad de cada columna
interface ColumnsVisibility {
  numero: boolean;
  año: boolean;
  nombre: boolean;
  categoria: boolean;
  estado: boolean;
  fechaCreacion: boolean;
}

// Interfaz del contexto que incluye el estado y la función para actualizarlo
interface ColumnsContextType {
  visibleColumns: ColumnsVisibility;
  setVisibleColumns: React.Dispatch<React.SetStateAction<ColumnsVisibility>>;
}

// Estado por defecto: todas las columnas se muestran
const defaultColumns: ColumnsVisibility = {
  numero: true,
  año: true,
  nombre: true,
  categoria: true,
  estado: false,
  fechaCreacion: true,
};

const ColumnsContext = createContext<ColumnsContextType>({
  visibleColumns: defaultColumns,
  setVisibleColumns: () => {},
});

// Hook para usar el contexto
export const useColumns = () => useContext(ColumnsContext);

// Provider del contexto
export const ColumnsProvider = ({ children }: { children: ReactNode }) => {
  const [visibleColumns, setVisibleColumns] =
    useState<ColumnsVisibility>(defaultColumns);

  return (
    <ColumnsContext.Provider value={{ visibleColumns, setVisibleColumns }}>
      {children}
    </ColumnsContext.Provider>
  );
};
