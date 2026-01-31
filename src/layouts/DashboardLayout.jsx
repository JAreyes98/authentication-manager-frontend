import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Key, 
  ShieldCheck, 
  Box, 
  LogOut, 
  LayoutDashboard 
} from 'lucide-react';

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/users', name: 'Users', icon: <Users size={20} /> },
    { path: '/api-keys', name: 'API Keys', icon: <Key size={20} /> },
    { path: '/roles', name: 'Roles', icon: <ShieldCheck size={20} /> },
    { path: '/inventory', name: 'API Inventory', icon: <Box size={20} /> },
  ];

  

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700 flex items-center gap-3">
          <LayoutDashboard className="text-blue-500" />
          <span className="font-bold text-lg tracking-tight">HC Manager</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-slate-700 text-slate-400'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold uppercase">
              {user?.username?.substring(0, 2) || 'AD'}
            </div>
            <span className="text-sm font-medium truncate">{user?.username || 'Admin'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet /> {/* Aquí se renderizarán las páginas como Users o ApiKeys */}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;