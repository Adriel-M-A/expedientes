import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

interface ExpedienteSearchProps {
  onSearch: (filters: {
    numero: string;
    año: string;
    nombre: string;
    categoria: string;
  }) => void;
}

interface FormInputs {
  numero: string;
  año: string;
  nombre: string;
  categoria: string;
}

export function ExpedienteSearch({ onSearch }: ExpedienteSearchProps) {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    onSearch(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Búsqueda de Expedientes</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div>
          <label
            htmlFor="numero"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Número
          </label>
          <input
            {...register("numero")}
            type="text"
            id="numero"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ej: 123456"
          />
        </div>
        <div>
          <label
            htmlFor="año"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Año
          </label>
          <input
            {...register("año")}
            type="text"
            id="año"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ej: 2024"
          />
        </div>
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre
          </label>
          <input
            {...register("nombre")}
            type="text"
            id="nombre"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Nombre del expediente"
          />
        </div>
        <div>
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Categoría
          </label>
          <select
            {...register("categoria")}
            id="categoria"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todas las categorías</option>
            <option value="administrativa">Administrativa</option>
            <option value="legal">Legal</option>
            <option value="financiera">Financiera</option>
            <option value="recursos-humanos">Recursos Humanos</option>
          </select>
        </div>
        <div className="md:col-span-2 lg:col-span-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Search size={20} className="mr-2" />
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
