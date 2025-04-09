import { useState } from "react";
import { ExpedienteSearch } from "../components/ExpedienteSearch";
import ExpedienteTable from "../components/ExpedienteTable";

export default function Home() {
  // Datos de ejemplo, normalmente estos vendrían del backend
  const sampleExpedientes = [
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
      año: "2023",
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
  ];

  // Estado para los expedientes filtrados
  const [filteredExpedientes, setFilteredExpedientes] =
    useState(sampleExpedientes);

  // Función de búsqueda que filtra los expedientes según los filtros recibidos
  const handleSearch = (filters: {
    numero: string;
    año: string;
    nombre: string;
    categoria: string;
  }) => {
    console.log("Searching with filters:", filters);

    const filtered = sampleExpedientes.filter((expediente) => {
      // Se verifica si cada campo cumple con el filtro; si el filtro está vacío se ignora
      const matchesNumero = filters.numero
        ? expediente.numero.includes(filters.numero)
        : true;
      const matchesAño = filters.año
        ? expediente.año.includes(filters.año)
        : true;
      const matchesNombre = filters.nombre
        ? expediente.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
        : true;
      // Se compara en minúsculas para evitar problemas con mayúsculas/minúsculas
      const matchesCategoria = filters.categoria
        ? expediente.categoria.toLowerCase() === filters.categoria.toLowerCase()
        : true;

      return matchesNumero && matchesAño && matchesNombre && matchesCategoria;
    });

    setFilteredExpedientes(filtered);
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

      <ExpedienteTable expedientes={filteredExpedientes} />
    </div>
  );
}
