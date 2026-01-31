import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Asegúrate de importar esto si no está en main.jsx
import Login from './pages/Login';
import Users from './pages/Users';
import ApiKeys from './pages/ApiKeys';
import Roles from './pages/Roles';
import Inventory from './pages/Inventory';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/users" />} />
            <Route path="users" element={<Users />} />
            <Route path="api-keys" element={<ApiKeys />} />
            <Route path="roles" element={<Roles />} />
            <Route path="inventory" element={<Inventory />} />
          </Route>
        </Route>

        {/* Catch-all: si la ruta no existe, al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;