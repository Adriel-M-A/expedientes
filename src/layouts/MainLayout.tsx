import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./SideBar";

export function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Se pasa la ruta actual al Sidebar para resaltar el enlace activo */}
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          {/* Outlet renderiza el componente de la ruta hija */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
