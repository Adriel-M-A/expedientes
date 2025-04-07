import { useState } from "react";
import { ExpedienteSearch } from "../components/ExpedienteSearch";
import { ExpedienteList } from "../components/ExpedienteList";

export default function Home() {
  // Sample data - replace with actual data from your backend
  const [expedientes] = useState([
    {
      id: 1,
      numero: "001234",
      año: "2024",
      nombre: "Contrato de Servicios",
      categoria: "Legal",
      estado: "Activo",
      fechaCreacion: "2024-03-15",
    },
    {
      id: 2,
      numero: "001235",
      año: "2024",
      nombre: "Solicitud de Personal",
      categoria: "Recursos Humanos",
      estado: "Pendiente",
      fechaCreacion: "2024-03-14",
    },
    {
      id: 3,
      numero: "001236",
      año: "2024",
      nombre: "Presupuesto Anual",
      categoria: "Financiera",
      estado: "Cerrado",
      fechaCreacion: "2024-03-13",
    },
  ]);

  const handleSearch = (filters: {
    numero: string;
    año: string;
    nombre: string;
    categoria: string;
  }) => {
    console.log("Searching with filters:", filters);
    // Implement your search logic here
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">
        Gestión de Expedientes
      </h1>
      <p className="text-lg text-gray-600">
        Busque y gestione expedientes de manera eficiente.
      </p>

      <ExpedienteSearch onSearch={handleSearch} />

      <ExpedienteList expedientes={expedientes} />
    </div>
  );
}
