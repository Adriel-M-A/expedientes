import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    // Contenedor de rutas para la aplicación
    <BrowserRouter>
      {/* Definición de las rutas */}
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
