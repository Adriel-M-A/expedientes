import { ColumnsVisibility } from "../context/ColumnsContext"; // Importación nombrada

interface ExpedientesTableHeaderProps {
  visibleColumns: ColumnsVisibility;
}

const ExpedientesTableHeader = ({
  visibleColumns,
}: ExpedientesTableHeaderProps) => {
  return (
    <tr>
      {/* Cada columna se renderiza solo si está habilitada en visibleColumns */}
      {visibleColumns.numero && <th className="px-4 py-2 border">Número</th>}
      {visibleColumns.año && <th className="px-4 py-2 border">Año</th>}
      {visibleColumns.nombre && <th className="px-4 py-2 border">Nombre</th>}
      {visibleColumns.categoria && (
        <th className="px-4 py-2 border">Categoría</th>
      )}
      {visibleColumns.estado && <th className="px-4 py-2 border">Estado</th>}
      {visibleColumns.fechaCreacion && (
        <th className="px-4 py-2 border">Fecha de Creación</th>
      )}
    </tr>
  );
};

export default ExpedientesTableHeader;
