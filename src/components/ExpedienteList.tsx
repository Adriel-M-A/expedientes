import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

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

export function ExpedienteList({ expedientes }: ExpedienteListProps) {
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>([]);

  const handleSort = (key: keyof Expediente) => {
    setSortConfigs((prevConfigs) => {
      const existingConfigIndex = prevConfigs.findIndex(
        (config) => config.key === key
      );

      if (existingConfigIndex !== -1) {
        // Toggle direction if exists
        if (prevConfigs[existingConfigIndex].direction === "asc") {
          const newConfigs = [...prevConfigs];
          newConfigs[existingConfigIndex].direction = "desc";
          return newConfigs;
        } else {
          // Remove if already desc
          return prevConfigs
            .filter((_, index) => index !== existingConfigIndex)
            .map((config) => ({
              ...config,
              priority:
                config.priority > prevConfigs[existingConfigIndex].priority
                  ? config.priority - 1
                  : config.priority,
            }));
        }
      } else {
        // Add new sort config
        return [
          ...prevConfigs,
          {
            key,
            direction: "asc",
            priority: prevConfigs.length,
          },
        ];
      }
    });
  };

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

  const getSortPriority = (key: keyof Expediente) => {
    const config = sortConfigs.find((c) => c.key === key);
    return config ? config.priority + 1 : null;
  };

  const sortedExpedientes = [...expedientes].sort((a, b) => {
    for (const { key, direction } of sortConfigs) {
      const aValue = String(a[key]).toLowerCase();
      const bValue = String(b[key]).toLowerCase();

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("numero")}
              >
                <div className="flex items-center">
                  Número
                  {getSortIcon("numero")}
                  {getSortPriority("numero") && (
                    <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
                      {getSortPriority("numero")}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("año")}
              >
                <div className="flex items-center">
                  Año
                  {getSortIcon("año")}
                  {getSortPriority("año") && (
                    <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
                      {getSortPriority("año")}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("nombre")}
              >
                <div className="flex items-center">
                  Nombre
                  {getSortIcon("nombre")}
                  {getSortPriority("nombre") && (
                    <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
                      {getSortPriority("nombre")}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("categoria")}
              >
                <div className="flex items-center">
                  Categoría
                  {getSortIcon("categoria")}
                  {getSortPriority("categoria") && (
                    <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
                      {getSortPriority("categoria")}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("estado")}
              >
                <div className="flex items-center">
                  Estado
                  {getSortIcon("estado")}
                  {getSortPriority("estado") && (
                    <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
                      {getSortPriority("estado")}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("fechaCreacion")}
              >
                <div className="flex items-center">
                  Fecha Creación
                  {getSortIcon("fechaCreacion")}
                  {getSortPriority("fechaCreacion") && (
                    <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
                      {getSortPriority("fechaCreacion")}
                    </span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedExpedientes.map((expediente) => (
              <tr key={expediente.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {expediente.numero}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expediente.año}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expediente.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expediente.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expediente.fechaCreacion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
