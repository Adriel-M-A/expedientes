import { ColumnsVisibility } from "../context/ColumnsContext";

// Interfaz para los expedientes (puede compartirse con la definida en ExpedientesTable)
interface Expediente {
  id: number;
  numero: string;
  año: string;
  nombre: string;
  categoria: string;
  estado: string;
  fechaCreacion: string;
}

interface ExpedientesTableBodyProps {
  expedientes: Expediente[];
  visibleColumns: ColumnsVisibility;
}

const ExpedientesTableBody = ({
  expedientes,
  visibleColumns,
}: ExpedientesTableBodyProps) => {
  return (
    <>
      {expedientes.map((expediente) => (
        <tr key={expediente.id} className="hover:bg-gray-100">
          {visibleColumns.numero && (
            <td className="px-4 py-2 border">{expediente.numero}</td>
          )}
          {visibleColumns.año && (
            <td className="px-4 py-2 border">{expediente.año}</td>
          )}
          {visibleColumns.nombre && (
            <td className="px-4 py-2 border">{expediente.nombre}</td>
          )}
          {visibleColumns.categoria && (
            <td className="px-4 py-2 border">{expediente.categoria}</td>
          )}
          {visibleColumns.estado && (
            <td className="px-4 py-2 border">{expediente.estado}</td>
          )}
          {visibleColumns.fechaCreacion && (
            <td className="px-4 py-2 border">{expediente.fechaCreacion}</td>
          )}
        </tr>
      ))}
    </>
  );
};

export default ExpedientesTableBody;
