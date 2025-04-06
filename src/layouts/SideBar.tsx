import { Link } from "react-router-dom";

interface SidebarProps {
  currentPath: string;
}

// Array con las rutas de navegación
const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Sidebar({ currentPath }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-100 shadow-md">
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              {/* Se resalta el enlace activo */}
              <Link
                to={item.path}
                className={`block p-4 text-gray-700 hover:bg-gray-200 ${
                  currentPath === item.path ? "bg-gray-300 font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
