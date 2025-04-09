import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import { ColumnsProvider } from "./context/ColumnsContext";

function App() {
  return (
    <BrowserRouter>
      <ColumnsProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </ColumnsProvider>
    </BrowserRouter>
  );
}

export default App;
