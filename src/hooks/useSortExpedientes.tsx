// Este hook maneja la lógica del ordenamiento de expedientes
import { useState } from "react";

// Tipos para Expediente y configuración de ordenamiento
export interface Expediente {
  id: number;
  numero: string;
  año: string;
  nombre: string;
  categoria: string;
  estado: string;
  fechaCreacion: string;
}

export type SortConfig = {
  key: keyof Expediente;
  direction: "asc" | "desc";
  priority: number;
};

export const useSortExpedientes = (expedientes: Expediente[]) => {
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>([]);

  // Manejador para actualizar el orden al hacer clic en el encabezado
  const handleSort = (key: keyof Expediente) => {
    setSortConfigs((prevConfigs) => {
      const existingIndex = prevConfigs.findIndex(
        (config) => config.key === key
      );
      let newConfigs: SortConfig[] = [];

      if (existingIndex !== -1) {
        const existingConfig = prevConfigs[existingIndex];
        if (existingConfig.direction === "asc") {
          // Cambia de ascendente a descendente y coloca al inicio
          newConfigs = [
            { key, direction: "desc", priority: 0 },
            ...prevConfigs.filter((_, i) => i !== existingIndex),
          ];
        } else if (existingConfig.direction === "desc") {
          // Si ya estaba en descendente, elimina la configuración de ordenamiento
          newConfigs = [...prevConfigs.filter((_, i) => i !== existingIndex)];
        }
      } else {
        // Si no existe, se agrega con orden ascendente al inicio
        newConfigs = [{ key, direction: "asc", priority: 0 }, ...prevConfigs];
      }

      // Se reasignan las prioridades según la posición en el array (0 = mayor prioridad)
      return newConfigs.map((config, index) => ({
        ...config,
        priority: index,
      }));
    });
  };

  // Función que devuelve el ícono de ordenamiento para cada columna
  const getSortIcon = (key: keyof Expediente) => {
    const config = sortConfigs.find((c) => c.key === key);
    if (!config)
      return <ArrowUpDown size={16} className="ml-1 text-gray-400" />;
    return config.direction === "asc" ? (
      <ArrowUp size={16} className="ml-1 text-blue-600" />
    ) : (
      <ArrowDown size={16} className="ml-1 text-blue-600" />
    );
  };

  // Función para mostrar la prioridad en un orden multi
  const getSortPriority = (key: keyof Expediente) => {
    const config = sortConfigs.find((c) => c.key === key);
    return config ? config.priority + 1 : null;
  };

  // Se ordenan los expedientes según las configuraciones definidas
  const sortedExpedientes = [...expedientes].sort((a, b) => {
    for (const { key, direction } of sortConfigs) {
      let aValue = a[key] as string | number;
      let bValue = b[key] as string | number;

      if (key === "numero" || key === "año") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return {
    sortedExpedientes,
    handleSort,
    getSortIcon,
    getSortPriority,
    sortConfigs,
  };
};

// No olvides importar los íconos desde "lucide-react"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
