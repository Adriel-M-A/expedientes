import { Link } from "react-router-dom";
import { Home, Info, Mail, Settings, Users } from "lucide-react";

interface SidebarProps {
  currentPath: string;
}

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Info },
  { name: "Team", path: "/team", icon: Users },
  { name: "Contact", path: "/contact", icon: Mail },
  { name: "Settings", path: "/settings", icon: Settings },
];

export function Sidebar({ currentPath }: SidebarProps) {
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">My App</h1>
      </div>
      <nav className="mt-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
                    currentPath === item.path
                      ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                      : ""
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
