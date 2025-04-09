import { useColumns } from "../context/ColumnsContext";
import ExpedientesHeader from "./ExpedienteTableHeader";
import ExpedientesBody from "./ExpedienteTableBody";

// Interfaz para los expedientes
interface Expediente {
  id: number;
  numero: string;
  año: string;
  nombre: string;
  categoria: string;
  estado: string;
  fechaCreacion: string;
}

interface ExpedientesTableProps {
  expedientes: Expediente[];
}

const ExpedientesTable = ({ expedientes }: ExpedientesTableProps) => {
  // Se obtiene la configuración de columnas visibles desde el contexto
  const { visibleColumns } = useColumns();

  return (
    <table className="min-w-full border-collapse">
      <thead>
        {/* Se pasa el objeto visibleColumns al componente del header */}
        <ExpedientesHeader visibleColumns={visibleColumns} />
      </thead>
      <tbody>
        {/* Se pasa la lista de expedientes y las columnas visibles al componente del body */}
        <ExpedientesBody
          expedientes={expedientes}
          visibleColumns={visibleColumns}
        />
      </tbody>
    </table>
  );
};

export default ExpedientesTable;
