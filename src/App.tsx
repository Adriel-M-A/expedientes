import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal con layout */}
        <Route path="/" element={<MainLayout />}>
          {/* Ruta index para la página de inicio */}
          <Route index element={<Home />} />
          {/* Aquí se pueden agregar más rutas hijas, por ejemplo:
          <Route path="about" element={<About />} />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
