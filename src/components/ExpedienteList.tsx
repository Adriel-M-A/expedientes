import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useColumns } from "../context/ColumnsContext";

interface Expediente {
  id: number;
  numero: string;
  año: string;
  nombre: string;
  categoria: string;
  estado: string;
  fechaCreacion: string;
}

interface ExpedienteListProps {
  expedientes: Expediente[];
}

type SortConfig = {
  key: keyof Expediente;
  direction: "asc" | "desc";
  priority: number;
};

export const ExpedienteList = ({ expedientes }: ExpedienteListProps) => {
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>([]);
  const { visibleColumns } = useColumns();

  // Se determina si hay expedientes para habilitar el encabezado
  const disableHeader = expedientes.length === 0;

  // Maneja el clic en el encabezado para ordenar
  const handleSort = (key: keyof Expediente) => {
    if (disableHeader) return; // No se permiten clics si no hay datos
    setSortConfigs((prevConfigs) => {
      const existingIndex = prevConfigs.findIndex(
        (config) => config.key === key
      );
      let newConfigs: SortConfig[] = [];

      if (existingIndex !== -1) {
        const existingConfig = prevConfigs[existingIndex];
        if (existingConfig.direction === "asc") {
          // Pasa de asc a desc y mueve la configuración al inicio
          newConfigs = [
            { key, direction: "desc", priority: 0 },
            ...prevConfigs.filter((_, i) => i !== existingIndex),
          ];
        } else if (existingConfig.direction === "desc") {
          // Si ya estaba en desc, se elimina (sin orden)
          newConfigs = [...prevConfigs.filter((_, i) => i !== existingIndex)];
        }
      } else {
        // Si no existe, se agrega al inicio con orden ascendente
        newConfigs = [{ key, direction: "asc", priority: 0 }, ...prevConfigs];
      }

      // Reasigna la prioridad según la posición en el array (0 = mayor prioridad)
      return newConfigs.map((config, index) => ({
        ...config,
        priority: index,
      }));
    });
  };

  // Devuelve el ícono según el estado del ordenamiento de la columna
  const getSortIcon = (key: keyof Expediente) =>
    (() => {
      const config = sortConfigs.find((c) => c.key === key);
      if (!config)
        return <ArrowUpDown size={16} className="ml-1 text-gray-400" />;
      return config.direction === "asc" ? (
        <ArrowUp size={16} className="ml-1 text-blue-600" />
      ) : (
        <ArrowDown size={16} className="ml-1 text-blue-600" />
      );
    })();

  // Muestra la prioridad de la columna en el orden multi
  const getSortPriority = (key: keyof Expediente) =>
    (() => {
      const config = sortConfigs.find((c) => c.key === key);
      return config ? config.priority + 1 : null;
    })();

  // Se ordenan los expedientes según las configuraciones
  const sortedExpedientes = [...expedientes].sort((a, b) => {
    for (const { key, direction } of sortConfigs) {
      // Se especifica que a[key] y b[key] pueden ser string o number
      let aValue = a[key] as string | number;
      let bValue = b[key] as string | number;

      if (key === "numero" || key === "año") {
        // Parseamos a número para comparación
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

  // Array de columnas definidas junto con su label
  const columns = [
    { key: "numero", label: "Número" },
    { key: "año", label: "Año" },
    { key: "nombre", label: "Nombre" },
    { key: "categoria", label: "Categoría" },
    { key: "estado", label: "Estado" },
    { key: "fechaCreacion", label: "Fecha Creación" },
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead
            className={`bg-gray-50 ${
              disableHeader ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <tr>
              {columns
                .filter(({ key }) => visibleColumns[key])
                .map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center">
                      {label}
                      {getSortIcon(key)}
                      {getSortPriority(key) && (
                        <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
                          {getSortPriority(key)}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedExpedientes.length > 0 ? (
              sortedExpedientes.map((expediente) => (
                <tr key={expediente.id} className="hover:bg-gray-50">
                  {visibleColumns.numero && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expediente.numero}
                    </td>
                  )}
                  {visibleColumns.año && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expediente.año}
                    </td>
                  )}
                  {visibleColumns.nombre && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expediente.nombre}
                    </td>
                  )}
                  {visibleColumns.categoria && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expediente.categoria}
                    </td>
                  )}
                  {visibleColumns.estado && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          expediente.estado === "Activo"
                            ? "bg-green-100 text-green-800"
                            : expediente.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {expediente.estado}
                      </span>
                    </td>
                  )}
                  {visibleColumns.fechaCreacion && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expediente.fechaCreacion}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.filter(({ key }) => visibleColumns[key]).length
                  }
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  No se han encontrado expedientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
