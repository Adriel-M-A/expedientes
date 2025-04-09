import { useColumns, ColumnsVisibility } from "../context/ColumnsContext"; // Se importa ColumnsVisibility

export const ColumnsToggle = () => {
  const { visibleColumns, setVisibleColumns } = useColumns();

  // Definición de las columnas disponibles junto a su label
  const columns = [
    { key: "numero", label: "Número" },
    { key: "año", label: "Año" },
    { key: "nombre", label: "Nombre" },
    { key: "categoria", label: "Categoría" },
    { key: "estado", label: "Estado" },
    { key: "fechaCreacion", label: "Fecha Creación" },
  ] as const;

  // Función para alternar la visibilidad de la columna utilizando keyof ColumnsVisibility
  const handleToggle = (key: keyof ColumnsVisibility) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Configuración de Columnas</h2>
      <ul className="space-y-2">
        {columns.map(({ key, label }) => (
          <li key={key} className="flex items-center">
            <input
              type="checkbox"
              checked={visibleColumns[key]}
              onChange={() => handleToggle(key)}
              className="mr-2"
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
